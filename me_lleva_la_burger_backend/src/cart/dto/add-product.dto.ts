/* eslint-disable prettier/prettier */
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id_producto: number;

    @ApiProperty({ example: 2 })
    @IsNumber()
    @IsNotEmpty()
    cantidad: number;
}
