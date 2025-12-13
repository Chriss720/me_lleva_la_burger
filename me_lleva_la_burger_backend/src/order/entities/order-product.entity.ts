/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id_pedido_producto: number;

    @Column()
    id_pedido: number;

    @Column()
    id_producto: number;

    @Column()
    cantidad: number;

    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;

    @ManyToOne(() => Order, order => order.orderProducts)
    @JoinColumn({ name: 'id_pedido' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderProducts)
    @JoinColumn({ name: 'id_producto' })
    product: Product;
}