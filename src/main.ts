import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from './modules/app-logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService()
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
  });

  const docConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  const envConfig = app.get(ConfigService);

  await app.listen(process.env.PORT || envConfig.get('app.port'));
}
bootstrap();
