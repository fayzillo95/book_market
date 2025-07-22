import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = new DocumentBuilder()
    .setTitle('UzMovie.com')
    .addBearerAuth()
    .build();

  const config = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/api-docs', app, config);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server is running ✅✅✅😁😁😁😁😁😁\n${process.env.BASE_URL}/api-docs`,
  );
}
bootstrap();
