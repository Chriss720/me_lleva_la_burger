import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    cantidad: string;

    @IsString()
    @IsNotEmpty()
    unidad: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsBoolean()
    @IsOptional()
    alerta?: boolean;

    @IsString()
    @IsOptional()
    mensaje?: string;
}
