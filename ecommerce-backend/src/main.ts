import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // reject apis that sent additional attributes in request other than mentioned ones
      transform: true // automatically transform request parameters as per defined types
    })
  );
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log(`Backend is running on: ${await app.getUrl()}`);
}
bootstrap();
