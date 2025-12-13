/* eslint-disable prettier/prettier */
export type Product = {
    id_producto: number;
    nombre_producto: string;
    descripcion: string;
    ingredientes: string;
    precio: number;
    foto?: string;
    disponibilidad: string;
    fecha_creacion?: Date;
};
