/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });

  // DEBUG: Check if OAuth variables are loaded
  console.log('------------------------------------------------');
  console.log('DEBUG: GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 5) + '...' : 'UNDEFINED');
  console.log('DEBUG: GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? process.env.GITHUB_CLIENT_ID.substring(0, 5) + '...' : 'UNDEFINED');
  console.log('DEBUG: FRONTEND_URL:', process.env.FRONTEND_URL);
  console.log('------------------------------------------------');

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Documentación de la API de BurguerExpress')
    .setDescription('Esta API permite gestionar todas las operaciones del sistema de pedidos de hamburguesas de BurguerExpress. Incluye la administración de productos, clientes, empleados, carritos de compras, pedidos y pagos. La documentación proporciona una descripción detallada de cada endpoint, los parámetros requeridos y opcionales, así como los códigos de respuesta y los esquemas de datos para facilitar la integración y el desarrollo.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
//cambio