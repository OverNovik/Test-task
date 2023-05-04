import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(port, () => {
    console.log(`Test task running on ${port} port`);
  });
}
bootstrap();
