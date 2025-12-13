/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddProductDto } from './dto/add-product.dto';
import { RemoveProductDto } from './dto/remove-product.dto';

@ApiTags('Carritos')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo carrito de compras',
    description: 'Este endpoint permite crear y registrar un nuevo carrito de compras para un cliente. Es el primer paso antes de agregar productos.'
  })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los carritos de compras',
    description: 'Devuelve una lista de todos los carritos de compras existentes en la base de datos. Usar con precaución, puede devolver una gran cantidad de datos.'
  })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un carrito por su ID',
    description: 'Permite buscar y obtener un carrito de compras específico utilizando su ID único. Devuelve el carrito si se encuentra.'
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un carrito de compras',
    description: 'Actualiza la información de un carrito de compras existente, como la lista de productos o las cantidades. Requiere el ID del carrito.'
  })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un carrito de compras',
    description: 'Elimina un carrito de compras de la base de datos utilizando su ID. Esta acción es irreversible.'
  })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Post(':id/add')
  @ApiOperation({ 
    summary: 'Agregar un producto al carrito',
    description: 'Añade un producto específico al carrito de compras. Se debe proporcionar el ID del producto y la cantidad a agregar.'
  })
  addProduct(@Param('id') id: string, @Body() addProductDto: AddProductDto) {
    return this.cartService.addProduct(+id, addProductDto);
  }

  @Post(':id/remove')
  @ApiOperation({ 
    summary: 'Eliminar un producto del carrito',
    description: 'Elimina un producto específico del carrito de compras. Se necesita el ID del producto a remover.'
  })
  removeProduct(@Param('id') id: string, @Body() removeProductDto: RemoveProductDto) {
    return this.cartService.removeProduct(+id, removeProductDto.id_producto);
  }

  @Post(':id/clear')
  @ApiOperation({ 
    summary: 'Vaciar el carrito de compras',
    description: 'Elimina todos los productos de un carrito de compras, dejándolo vacío. Requiere el ID del carrito.'
  })
  clearCart(@Param('id') id: string) {
    return this.cartService.clearCart(+id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ 
    summary: 'Obtener el carrito de un cliente',
    description: 'Busca y devuelve el carrito de compras activo asociado a un cliente específico, utilizando el ID del cliente.'
  })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.cartService.findByCustomer(+customerId);
  }
}
