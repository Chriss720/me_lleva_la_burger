/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id_cliente: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id_empleado: number;

    @ApiProperty({ example: 250.75 })
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty({ example: 'pendiente' })
    @IsString()
    @IsNotEmpty()
    estado: string;
}
