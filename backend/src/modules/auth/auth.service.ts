import {
	BadRequestException,
	ConflictException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from './mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignupDto } from './dto/signup.dto';

type SafeUser = Omit<User, 'password' | 'resetToken' | 'resetTokenExp'>;
export type GoogleUserPayload = {
	googleId: string;
	name: string;
	email: string;
};

export interface AuthResponse {
	token: string;
	user: SafeUser;
}

export interface MessageResponse {
	message: string;
}

@Injectable()
export class AuthService {
	private readonly saltRounds = 10;
	private readonly resetTokenTTL = 1000 * 60 * 60;
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
	) {}

	async signup(dto: SignupDto): Promise<AuthResponse> {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (existingUser) {
			throw new ConflictException('Email already in use');
		}

		const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);
		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: passwordHash,
			},
		});

		const safeUser = this.toSafeUser(user);
		const token = await this.jwtService.signAsync(this.buildTokenPayload(safeUser));

		return { token, user: safeUser };
	}

	async login(dto: LoginDto): Promise<AuthResponse> {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		if (!user.password) {
			throw new UnauthorizedException('Use Google sign-in');
		}

		const passwordMatches = await bcrypt.compare(dto.password, user.password);
		if (!passwordMatches) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const safeUser = this.toSafeUser(user);
		const token = await this.jwtService.signAsync(this.buildTokenPayload(safeUser));

		return { token, user: safeUser };
	}

	async loginWithGoogle(profile: GoogleUserPayload): Promise<AuthResponse> {
		if (!profile?.email) {
			throw new UnauthorizedException('Google account missing email');
		}

		let user = await this.prisma.user.findUnique({
			where: { email: profile.email },
		});

		if (!user) {
			user = await this.prisma.user.create({
				data: {
					name: profile.name,
					email: profile.email,
					googleId: profile.googleId,
					provider: 'GOOGLE',
				},
			});
		} else if (!user.googleId || user.provider !== 'GOOGLE') {
			user = await this.prisma.user.update({
				where: { id: user.id },
				data: { googleId: profile.googleId, provider: 'GOOGLE' },
			});
		}

		const safeUser = this.toSafeUser(user);
		const token = await this.jwtService.signAsync(this.buildTokenPayload(safeUser));

		return { token, user: safeUser };
	}

	async forgotPassword(dto: ForgotPasswordDto): Promise<MessageResponse> {
		const message = 'If an account exists, a reset link has been sent.';
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (!user) {
			return { message };
		}

		const rawToken = randomBytes(32).toString('hex');
		const tokenHash = this.hashResetToken(rawToken);
		const expiresAt = new Date(Date.now() + this.resetTokenTTL);

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				resetToken: tokenHash,
				resetTokenExp: expiresAt,
			},
		});

		const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
		const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(
			rawToken,
		)}`;

		try {
			await this.mailService.sendPasswordResetEmail(
				user.email,
				user.name,
				resetUrl,
			);
		} catch (error) {
			this.logger.error('Failed to send reset email', error as Error);
		}

		return { message };
	}

	async resetPassword(dto: ResetPasswordDto): Promise<MessageResponse> {
		const tokenHash = this.hashResetToken(dto.token);
		const user = await this.prisma.user.findFirst({
			where: {
				resetToken: tokenHash,
				resetTokenExp: { gt: new Date() },
			},
		});

		if (!user) {
			throw new BadRequestException('Invalid or expired token');
		}

		const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				password: passwordHash,
				resetToken: null,
				resetTokenExp: null,
			},
		});

		return { message: 'Password reset successful.' };
	}

	private buildTokenPayload(user: SafeUser): {
		sub: string;
		name: string;
		email: string;
	} {
		return { sub: user.id, name: user.name, email: user.email };
	}

	private toSafeUser(user: User): SafeUser {
		const {
			password: _password,
			resetToken: _resetToken,
			resetTokenExp: _resetTokenExp,
			...safeUser
		} = user;
		return safeUser;
	}

	private hashResetToken(token: string): string {
		return createHash('sha256').update(token).digest('hex');
	}
}
