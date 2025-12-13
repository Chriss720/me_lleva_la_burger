/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Pedidos')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo pedido',
    description: 'Permite registrar un nuevo pedido en el sistema. Se debe especificar el cliente, los productos y la cantidad.'
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los pedidos',
    description: 'Devuelve una lista de todos los pedidos realizados en la plataforma. Puede ser útil para el seguimiento general.'
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un pedido por su ID',
    description: 'Busca y devuelve la información de un pedido específico utilizando su ID único. Ideal para el seguimiento de un pedido concreto.'
  })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un pedido',
    description: 'Permite actualizar la información de un pedido existente, como los productos o la dirección de entrega. Requiere el ID del pedido.'
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un pedido',
    description: 'Elimina un pedido de la base de datos utilizando su ID. Esta acción debe realizarse con cuidado, ya que es irreversible.'
  })
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Post('from-cart/:cartId')
  @ApiOperation({ 
    summary: 'Crear un pedido a partir de un carrito',
    description: 'Genera un nuevo pedido utilizando los productos existentes en un carrito de compras. Facilita la conversión de un carrito a un pedido final.'
  })
  @ApiQuery({ name: 'employeeId', required: false })
  fromCart(@Param('cartId') cartId: string, @Query('employeeId') employeeId: string) {

    return this.orderService.fromCart(+cartId, Number(employeeId ?? 0));
  }

  @Get('customer/:customerId')
  @ApiOperation({ 
    summary: 'Obtener pedidos de un cliente',
    description: 'Devuelve una lista de todos los pedidos realizados por un cliente específico, utilizando el ID del cliente.'
  })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.orderService.findByCustomer(+customerId);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ 
    summary: 'Obtener pedidos asignados a un empleado',
    description: 'Devuelve una lista de los pedidos que han sido asignados a un empleado para su gestión y preparación.'
  })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.orderService.findByEmployee(+employeeId);
  }

  @Patch(':id/status')
  @ApiOperation({ 
    summary: 'Actualizar el estado de un pedido',
    description: 'Permite cambiar el estado de un pedido (por ejemplo, de \'pendiente\' a \'en preparación\', \'enviado\' o \'entregado\').'
  })
  patchStatus(@Param('id') id: string, @Body('estado') estado: string) {
    return this.orderService.patchStatus(+id, estado);
  }
}
