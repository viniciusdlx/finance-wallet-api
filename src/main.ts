import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dayjs from 'dayjs';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './config/exceptions/global-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            stopAtFirstError: true,
        }),
    );

    app.useGlobalFilters(new GlobalExceptionFilter());

    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v',
    });

    const config = new DocumentBuilder()
        .setTitle('Finance Wallet')
        .setVersion('1.0')
        .addBearerAuth({
            name: 'Authorization',
            bearerFormat: 'JWT',
            in: 'header',
            type: 'http',
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || 'localhost';

    await app.listen(PORT);
    console.log(`Running on http://${HOST}:${PORT}`);
    console.log(`DateTime Now ${dayjs().format()}`);
    console.log(
        `Hour Now ${new Date().toLocaleTimeString('pt-BR', { timeStyle: 'medium' })}`,
    );
    console.log('TimeZone -> ', process.env.TZ);
}
bootstrap();
