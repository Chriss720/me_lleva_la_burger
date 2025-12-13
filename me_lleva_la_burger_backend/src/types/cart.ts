/* eslint-disable prettier/prettier */
export type CartProduct = {
    id_carrito_producto: number;
    id_carrito: number;
    id_producto: number;
    cantidad: number;
};

export type Cart = {
    id_carrito: number;
    id_cliente: number;
    fecha_creacion?: Date;
    estado: string;
    cartProducts?: CartProduct[];
};
