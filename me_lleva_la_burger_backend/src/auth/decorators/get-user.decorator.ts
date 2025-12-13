/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../../types';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthUser => {
        const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
        return request.user;
    },
);
