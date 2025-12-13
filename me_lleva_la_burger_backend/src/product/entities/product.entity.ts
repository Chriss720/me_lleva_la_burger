/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { OrderProduct } from 'src/order/entities/order-product.entity';
import { CartProduct } from 'src/cart/entities/cart-product.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column()
    nombre_producto: string;

    @Column('text')
    descripcion: string;

    @Column('text')
    ingredientes: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @Column({ nullable: true })
    foto: string;

    @Column()
    disponibilidad: string;

    @CreateDateColumn()
    fecha_creacion: Date;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[];

    @OneToMany(() => CartProduct, cartProduct => cartProduct.product)
    cartProducts: CartProduct[];
}
