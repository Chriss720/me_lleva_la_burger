/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id_resena: number;

    @Column()
    id_pedido: number;

    @Column()
    id_cliente: number;

    @Column('text')
    comentario: string;

    @Column()
    calificacion: number;

    @CreateDateColumn()
    fecha: Date;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'id_pedido' })
    order: Order;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'id_cliente' })
    customer: Customer;
}