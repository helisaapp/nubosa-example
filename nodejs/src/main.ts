import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
  const url = await app.getUrl();
  // Simple startup log
  // eslint-disable-next-line no-console
  console.log(`Nest app running at ${url}`);
}

bootstrap();
