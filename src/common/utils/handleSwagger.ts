import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function handleSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Seed rest api typeorm')
    .setDescription('This is a starter api')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}
