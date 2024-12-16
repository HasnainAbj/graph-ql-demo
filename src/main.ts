import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { swagger } from './swagger';
import { AllExceptionsFilter } from './dispatchers/all-exceptions.filter';
import { ValidationPipe } from './validators/validation.pipe';
import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use((req: Request, body: Body, next: any) => {
    console.log('======> req url:', req.url, '======> req method:', req.method);
    next();
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  const logger = new Logger('bootstrap');

  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  swagger(app);

  app.use(helmet());

  configService.workingEnvironmentLog();

  await app.listen(configService.get('PORT')).then(() => {
    logger.log(
      `Server started on port: ${configService.get('PORT')} ${
        process.env.NODE_ENV
      }`,
    );
  });
}

bootstrap();
