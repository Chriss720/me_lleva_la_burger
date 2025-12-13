/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty({ example: 'Juan' })
    @IsString()
    @IsNotEmpty()
    nombre_cliente: string;

    @ApiProperty({ example: 'Pérez' })
    @IsString()
    @IsNotEmpty()
    apellido_cliente: string;

    @ApiProperty({ example: 'juan@ejemplo.com' })
    @IsEmail()
    @IsNotEmpty()
    correo_cliente: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    contrasena_cliente: string;

    @ApiProperty({ example: '5551234567' })
    @IsString()
    @IsNotEmpty()
    telefono_cliente: string;

    @ApiProperty({ example: 'Calle Principal 123' })
    @IsString()
    @IsNotEmpty()
    direccion: string;

    @ApiProperty({ example: 'activo' })
    @IsString()
    @IsNotEmpty()
    estado_cliente: string;
}
