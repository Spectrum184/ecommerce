import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { configService } from 'src/configs/config';
import { AppModule } from 'src/modules';
import { fastifyHelmet } from 'fastify-helmet';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from 'src/common/http-exception';
import fastifyCsrf from 'fastify-csrf';
import fastifyCookie from 'fastify-cookie';
import compression from 'fastify-compress';

export const server = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  app.enableCors();
  app.register(fastifyCookie);
  app.register(fastifyCsrf);
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  await app.register(compression);

  await app.listen(configService.getPort());
};
