/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Column()
    nombre_empleado: string;

    @Column()
    apellido_empleado: string;

    @Column()
    correo_empleado: string;

    @Column()
    contrasena_empleado: string;

    @Column()
    telefono_empleado: string;

    @Column()
    cargo: string;

    @Column()
    estado_empleado: string;

    @OneToMany(() => Order, order => order.employee)
    orders: Order[];
}
