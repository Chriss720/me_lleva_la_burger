/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { Customer } from '../customer/entities/customer.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
    imports: [
        ConfigModule, // Make ConfigService available to strategies
        TypeOrmModule.forFeature([Customer, Employee]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '24h' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, GoogleStrategy, GithubStrategy],
    exports: [AuthService],
})
export class AuthModule { }
