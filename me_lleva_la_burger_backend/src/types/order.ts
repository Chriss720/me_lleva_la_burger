/* eslint-disable prettier/prettier */
export type OrderProduct = {
    id_pedido_producto: number;
    id_pedido: number;
    id_producto: number;
    cantidad: number;
};

export type Order = {
    id_pedido: number;
    id_cliente: number;
    id_empleado: number;
    fecha_pedido?: Date;
    total: number;
    estado: string;
    orderProducts?: OrderProduct[];
};
