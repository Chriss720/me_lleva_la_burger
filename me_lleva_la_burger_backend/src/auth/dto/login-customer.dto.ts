/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerDto {
    @ApiProperty({ example: 'juan@ejemplo.com' })
    @IsEmail()
    @IsNotEmpty()
    correo_cliente: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    contrasena_cliente: string;
}
