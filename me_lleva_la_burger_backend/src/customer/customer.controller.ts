/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { AuthUser } from '../types';

@ApiTags('Clientes')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo cliente',
    description: 'Permite registrar a un nuevo cliente en la base de datos. Se requiere proporcionar información personal como nombre, correo electrónico y contraseña.'
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los clientes',
    description: 'Devuelve una lista completa de todos los clientes registrados en el sistema. Puede ser una operación sensible, manejar con cuidado.'
  })
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('perfil')
  @ApiOperation({ 
    summary: 'Obtener el perfil del cliente autenticado',
    description: 'Devuelve la información del perfil del cliente que ha iniciado sesión. Requiere un token de autenticación válido.'
  })
  getPerfil(@GetUser() user: AuthUser) {
    return this.customerService.findOne(user.id);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un cliente por su ID',
    description: 'Busca y devuelve la información de un cliente específico utilizando su ID único. Ideal para consultas directas.'
  })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un cliente',
    description: 'Permite actualizar la información de un cliente existente, como su nombre, dirección o número de teléfono. Requiere el ID del cliente.'
  })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un cliente',
    description: 'Elimina a un cliente de la base de datos utilizando su ID. Esta acción es permanente y debe ser usada con precaución.'
  })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
