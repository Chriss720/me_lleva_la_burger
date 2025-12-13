/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty()
    id_pedido: number;

    @IsNumber()
    @IsNotEmpty()
    id_cliente: number;

    @IsString()
    @IsNotEmpty()
    comentario: string;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    calificacion: number;
}