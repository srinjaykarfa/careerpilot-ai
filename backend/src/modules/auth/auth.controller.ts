import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import {
	AuthService,
	AuthResponse,
	GoogleUserPayload,
	MessageResponse,
} from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	signup(@Body() dto: SignupDto): Promise<AuthResponse> {
		return this.authService.signup(dto);
	}

	@Post('login')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	login(@Body() dto: LoginDto): Promise<AuthResponse> {
		return this.authService.login(dto);
	}

	@Post('forgot-password')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	forgotPassword(@Body() dto: ForgotPasswordDto): Promise<MessageResponse> {
		return this.authService.forgotPassword(dto);
	}

	@Post('reset-password')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	resetPassword(@Body() dto: ResetPasswordDto): Promise<MessageResponse> {
		return this.authService.resetPassword(dto);
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	googleAuth(): void {
		return;
	}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleCallback(@Req() req: Request, @Res() res: Response) {
		const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
		type RequestWithUser = Request & { user: GoogleUserPayload };
		const { user } = req as RequestWithUser;
		const auth = await this.authService.loginWithGoogle(user);
		const userPayload = Buffer.from(JSON.stringify(auth.user)).toString('base64');
		const redirectUrl = `${frontendUrl}/google/callback?token=${encodeURIComponent(
			auth.token,
		)}&user=${encodeURIComponent(userPayload)}`;

		return res.redirect(redirectUrl);
	}
}
