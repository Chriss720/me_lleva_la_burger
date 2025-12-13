/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CartProduct {
    @PrimaryGeneratedColumn()
    id_carrito_producto: number;

    @Column()
    id_carrito: number;

    @Column()
    id_producto: number;

    @Column()
    cantidad: number;

    @ManyToOne(() => Cart, cart => cart.cartProducts)
    @JoinColumn({ name: 'id_carrito' })
    cart: Cart;

    @ManyToOne(() => Product, product => product.cartProducts)
    @JoinColumn({ name: 'id_producto' })
    product: Product;
}