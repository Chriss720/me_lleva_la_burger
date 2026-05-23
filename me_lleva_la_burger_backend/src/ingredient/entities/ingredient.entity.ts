import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    cantidad: string;

    @Column()
    unidad: string;

    @Column()
    estado: string;

    @Column({ default: false })
    alerta: boolean;

    @Column({ nullable: true })
    mensaje: string;
}
