/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginEmployeeDto {
    @ApiProperty({ example: 'carlos@ejemplo.com' })
    @IsEmail()
    @IsNotEmpty()
    correo_empleado: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    contrasena_empleado: string;
}
