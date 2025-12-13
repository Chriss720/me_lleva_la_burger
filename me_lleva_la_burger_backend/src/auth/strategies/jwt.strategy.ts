/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, AuthUser } from '../../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Me_lleva_la_burguer_no_se_que_poner_mondongo_123' // Luego lo cambio a un .env
        });
    }

    validate(payload: JwtPayload): AuthUser {
        return { 
            id: payload.sub, 
            email: payload.email, 
            tipo: payload.tipo 
        };
    }
}
