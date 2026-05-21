import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

type GoogleProfile = {
  email: string;
  name: string;
  googleId: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ??
        'http://localhost:3002/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(new UnauthorizedException('Google account has no email'));
    }

    const nameFromProfile = profile.displayName?.trim();
    const fallbackName = `${profile.name?.givenName ?? ''} ${
      profile.name?.familyName ?? ''
    }`.trim();

    const user: GoogleProfile = {
      googleId: profile.id,
      email,
      name: nameFromProfile || fallbackName || email.split('@')[0],
    };

    return done(null, user);
  }
}
