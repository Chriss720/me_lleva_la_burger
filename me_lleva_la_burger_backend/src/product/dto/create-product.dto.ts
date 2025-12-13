/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Hamburguesa Clásica' })
    @IsString()
    @IsNotEmpty()
    nombre_producto: string;

    @ApiProperty({ example: 'Hamburguesa con carne, lechuga y tomate' })
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty({ example: 'Carne, lechuga, tomate, queso' })
    @IsString()
    @IsNotEmpty()
    ingredientes: string;

    @ApiProperty({ example: 150.50 })
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @ApiPropertyOptional({ example: 'https://ejemplo.com/foto.jpg' })
    @IsString()
    @IsOptional()
    foto?: string;

    @ApiProperty({ example: 'disponible' })
    @IsString()
    @IsNotEmpty()
    disponibilidad: string;
}
