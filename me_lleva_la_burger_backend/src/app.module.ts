/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().optional(),
        GOOGLE_CLIENT_SECRET: Joi.string().optional(),
        GITHUB_CLIENT_ID: Joi.string().optional(),
        GITHUB_CLIENT_SECRET: Joi.string().optional(),
        GITHUB_CALLBACK_URL: Joi.string().optional(),
        GOOGLE_CALLBACK_URL: Joi.string().optional(),
      }),
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'burger_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CustomerModule,
    EmployeeModule,
    ProductModule,
    OrderModule,
    PaymentModule,
    CartModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
