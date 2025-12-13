/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({ example: 'Carlos' })
    @IsString()
    @IsNotEmpty()
    nombre_empleado: string;

    @ApiProperty({ example: 'López' })
    @IsString()
    @IsNotEmpty()
    apellido_empleado: string;

    @ApiProperty({ example: 'carlos@ejemplo.com' })
    @IsEmail()
    @IsNotEmpty()
    correo_empleado: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    contrasena_empleado: string;

    @ApiProperty({ example: '5559876543' })
    @IsString()
    @IsNotEmpty()
    telefono_empleado: string;

    @ApiProperty({ example: 'Cajero' })
    @IsString()
    @IsNotEmpty()
    cargo: string;

    @ApiProperty({ example: 'activo' })
    @IsString()
    @IsNotEmpty()
    estado_empleado: string;
}
