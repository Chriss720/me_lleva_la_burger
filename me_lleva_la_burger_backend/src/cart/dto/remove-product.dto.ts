/* eslint-disable prettier/prettier */
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveProductDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id_producto: number;
}
