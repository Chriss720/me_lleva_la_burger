/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id_cliente: number;

    @ApiProperty({ example: 'activo' })
    @IsString()
    @IsNotEmpty()
    estado: string;
}
