
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(
        configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            clientID: configService.get<string>('GITHUB_CLIENT_ID') || 'client_id_placeholder',
            clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') || 'client_secret_placeholder',
            callbackURL: configService.get<string>('GITHUB_CALLBACK_URL') || 'http://localhost:3000/auth/github/callback',
            scope: ['user:email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        const { id, username, photos, emails } = profile;
        const oAuthProfile = {
            email: emails && emails.length > 0 ? emails[0].value : null,
            username: username,
            firstName: username,
            lastName: '',
            picture: photos && photos.length > 0 ? photos[0].value : null,
            providerId: id,
            provider: 'github',
            accessToken,
        };

        const user = await this.authService.validateOAuthUser(oAuthProfile);
        done(null, user);
    }
}
