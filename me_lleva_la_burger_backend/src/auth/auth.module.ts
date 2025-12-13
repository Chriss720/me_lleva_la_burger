/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Customer } from '../customer/entities/customer.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, Employee]),
        PassportModule,
        JwtModule.register({
            secret: 'SECRET_KEY_123',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
