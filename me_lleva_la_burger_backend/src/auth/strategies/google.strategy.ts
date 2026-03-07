
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'client_id_placeholder',
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || 'client_secret_placeholder',
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos, id } = profile;
        const oAuthProfile = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            providerId: id,
            provider: 'google',
            accessToken,
        };

        const user = await this.authService.validateOAuthUser(oAuthProfile);
        done(null, user);
    }
}
