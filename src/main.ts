import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';
import { AllExceptionFilter } from './shared/filters/all-exeption.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  // Swagger Configuuration
  const config = new DocumentBuilder()
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'bearer {{token}}',
    name: 'JWT',
    in: 'header'
  }, 'Auth-JWT')
  .setTitle('Todo Title')
  .setDescription('Todo description')
  .setVersion('1.0')
  .addTag('Todo tag')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  // Global Configuration
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  // app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  await app.listen(process.env.APP_PORT ?? 3000);
  console.log(`This todo application is running on: ${await app.getUrl()}`);
}
bootstrap();
