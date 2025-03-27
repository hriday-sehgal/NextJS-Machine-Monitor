import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific frontend URL
  app.enableCors({
    origin: 'http://localhost:3002', // Frontend port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Use validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Machine Monitoring API')
    .setDescription('The Machine Monitoring API description')
    .setVersion('1.0')
    .addTag('machines')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Set port
  const port = 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
