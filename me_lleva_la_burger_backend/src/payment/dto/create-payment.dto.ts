/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id_pedido: number;

    @ApiProperty({ example: 'tarjeta' })
    @IsString()
    @IsNotEmpty()
    metodo: string;

    @ApiProperty({ example: 250.75 })
    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @ApiProperty({ example: 'completado' })
    @IsString()
    @IsNotEmpty()
    estado: string;
}
