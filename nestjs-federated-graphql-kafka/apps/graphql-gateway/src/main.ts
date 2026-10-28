import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(
    GraphqlGatewayModule,
    new ExpressAdapter(),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
