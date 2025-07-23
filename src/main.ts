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
  
  const HOST = process.env.HOST || "localhost"
  const PORT = process.env.PORT ?? 3000
  const BASE_URL = `http://${HOST}:${PORT}`

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server is running ✅✅✅  \n${BASE_URL}/api-docs`,
  );
}
bootstrap();
