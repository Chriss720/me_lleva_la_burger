/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartProduct } from './entities/cart-product.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProduct, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }
