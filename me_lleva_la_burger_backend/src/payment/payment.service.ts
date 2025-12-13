/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto as Partial<Payment>);
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id_pago: id });
    if (!payment) throw new NotFoundException(`Payment with ID ${id} not found`);
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<{ message: string; payment?: Payment }> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
    return { message: `Payment with ID ${id} removed`, payment };
  }


  async process(createPaymentDto: CreatePaymentDto): Promise<{ success: boolean; payment?: Payment }> {
    // In real system: call a payment gateway, handle webhooks, etc.
    const payment = await this.create(createPaymentDto);
    return { success: true, payment };
  }

  async findByOrder(orderId: number): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { id_pedido: orderId } });
  }
}
