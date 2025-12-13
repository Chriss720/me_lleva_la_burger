/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(createCustomerDto.contrasena_cliente, 10);
    const customer = this.customerRepository.create({
      ...createCustomerDto,
      contrasena_cliente: hashedPassword,
    } as Partial<Customer>);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id_cliente: id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);

    if (updateCustomerDto.contrasena_cliente) {
      updateCustomerDto.contrasena_cliente = await bcrypt.hash(updateCustomerDto.contrasena_cliente, 10);
    }

    Object.assign(customer, updateCustomerDto);
    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<{ message: string; customer?: Customer }> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
    return { message: `Customer with ID ${id} removed`, customer };
  }
}
