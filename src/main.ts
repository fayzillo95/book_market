import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api")
  const document = new DocumentBuilder()
    .setTitle('Books')
    .build();

  const config = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/api-docs', app, config);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted :true,
    forbidUnknownValues : true,
    transform : true
  }))
  app.enableCors()
  
  const HOST = process.env.HOST || "localhost"
  const PORT = process.env.PORT ?? 3000
  const BASE_URL = process.env.BASE_URL || `http://${HOST}:${PORT}` // baseur

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    ` Server is running ✅✅✅  \n ${BASE_URL}/api-docs\n`,
    process.env.BASE_URL
  );
}
bootstrap();
