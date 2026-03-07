/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

interface RequestMeta {
    count: number;
    resetTime: number;
}

@Injectable()
export class RateLimiterGuard implements CanActivate {
    private readonly reqs = new Map<string, RequestMeta>();
    private readonly WINDOW_MS = 60000;
    private readonly MAX_REQUESTS = 10;

    constructor() {
        setInterval(() => this.cleanUp(), this.WINDOW_MS);
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const ip = request.ip || 'unknown-ip';
        const now = Date.now();

        const record = this.reqs.get(ip);

        if (!record) {
            this.reqs.set(ip, {
                count: 1,
                resetTime: now + this.WINDOW_MS,
            });
            return true;
        }

        if (now > record.resetTime) {
            record.count = 1;
            record.resetTime = now + this.WINDOW_MS;
            return true;
        }

        if (record.count >= this.MAX_REQUESTS) {
            throw new HttpException(
                'Too Many Requests - Rate Limit Exceeded',
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }

        record.count += 1;
        return true;
    }

    private cleanUp() {
        const now = Date.now();
        for (const [ip, meta] of this.reqs.entries()) {
            if (now > meta.resetTime) {
                this.reqs.delete(ip);
            }
        }
    }
}
