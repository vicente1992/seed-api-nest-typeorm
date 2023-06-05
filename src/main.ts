import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleSwagger } from '@common/utils/handleSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  handleSwagger(app);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀🚀 api running on port ${PORT} 🚀🚀`);
}
bootstrap();
