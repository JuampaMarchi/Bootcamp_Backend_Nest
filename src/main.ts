import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Proyecto NestJS Codigo Facilito')
    .setDescription('Proyecto de Blog con posteos y comentarios')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document)

  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')

  await app.listen(port);
  console.log(`Aplicacion corriendo en http://localhost:${port}`);
}

bootstrap();
