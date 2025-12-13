/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('Pagos')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo pago',
    description: 'Registra un nuevo pago en el sistema, asociándolo a un pedido existente. Se debe especificar el monto y el método de pago.'
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Post('process')
  @ApiOperation({ 
    summary: 'Procesar un pago',
    description: 'Simula el procesamiento de un pago, cambiando su estado a \'completado\'. Este es un paso crucial en el flujo de compra.'
  })
  process(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.process(createPaymentDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los pagos',
    description: 'Devuelve una lista de todos los pagos registrados en la base de datos. Útil para auditorías y seguimiento financiero.'
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un pago por su ID',
    description: 'Busca y devuelve la información de un pago específico utilizando su ID único. Permite verificar el estado de un pago.'
  })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un pago',
    description: 'Permite actualizar la información de un pago existente, como el método de pago o el estado. Requiere el ID del pago.'
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un pago',
    description: 'Elimina un pago de la base de datos utilizando su ID. Esta acción debe ser manejada con cuidado, ya que es irreversible.'
  })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @Get('order/:orderId')
  @ApiOperation({ 
    summary: 'Obtener el pago de un pedido',
    description: 'Busca y devuelve el pago asociado a un pedido específico, utilizando el ID del pedido. Facilita la conciliación de pagos y pedidos.'
  })
  findByOrder(@Param('orderId') orderId: string) {
    return this.paymentService.findByOrder(+orderId);
  }
}

