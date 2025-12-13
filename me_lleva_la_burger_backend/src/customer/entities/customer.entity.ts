/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id_cliente: number;

    @Column()
    nombre_cliente: string;

    @Column()
    apellido_cliente: string;

    @Column()
    correo_cliente: string;

    @Column()
    contrasena_cliente: string;

    @Column()
    telefono_cliente: string;

    @Column()
    direccion: string;

    @CreateDateColumn()
    fecha_registro: Date;

    @Column()
    estado_cliente: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @OneToMany(() => Cart, cart => cart.customer)
    carts: Cart[];
}
