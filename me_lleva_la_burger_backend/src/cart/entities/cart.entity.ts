/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { CartProduct } from './cart-product.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id_carrito: number;

    @Column()
    id_cliente: number;

    @CreateDateColumn()
    fecha_creacion: Date;

    @Column()
    estado: string;

    @ManyToOne(() => Customer, customer => customer.carts)
    @JoinColumn({ name: 'id_cliente' })
    customer: Customer;

    @OneToMany(() => CartProduct, cartProduct => cartProduct.cart)
    cartProducts: CartProduct[];
}
