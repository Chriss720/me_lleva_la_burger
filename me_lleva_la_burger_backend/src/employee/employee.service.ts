/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const hashedPassword = await bcrypt.hash(createEmployeeDto.contrasena_empleado, 10);
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      contrasena_empleado: hashedPassword,
    } as Partial<Employee>);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id_empleado: id });
    if (!employee) throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);

    if (updateEmployeeDto.contrasena_empleado) {
      updateEmployeeDto.contrasena_empleado = await bcrypt.hash(updateEmployeeDto.contrasena_empleado, 10);
    }

    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<{ message: string; employee?: Employee }> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
    return { message: `Employee with ID ${id} removed`, employee };
  }
}
