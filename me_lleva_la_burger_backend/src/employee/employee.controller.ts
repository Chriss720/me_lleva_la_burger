/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@ApiTags('Empleados')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo empleado',
    description: 'Permite registrar a un nuevo empleado en el sistema. Se requiere información como nombre, puesto y datos de contacto.'
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los empleados',
    description: 'Devuelve una lista completa de todos los empleados registrados. Ideal para la gestión de personal.'
  })
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un empleado por su ID',
    description: 'Busca y devuelve la información de un empleado específico utilizando su ID único. Útil para consultas directas.'
  })
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un empleado',
    description: 'Permite actualizar la información de un empleado existente, como su puesto o salario. Requiere el ID del empleado.'
  })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un empleado',
    description: 'Elimina a un empleado de la base de datos utilizando su ID. Esta acción es permanente y debe ser usada con precaución.'
  })
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
