/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id_pago: number;

    @Column()
    id_pedido: number;

    @Column()
    metodo: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @CreateDateColumn()
    fecha_pago: Date;

    @Column()
    estado: string;

    @OneToOne(() => Order, order => order.payment)
    @JoinColumn({ name: 'id_pedido' })
    order: Order;
}
