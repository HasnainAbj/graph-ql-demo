import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from './config/config.service';

/**
 * @description to create swagger documentation
 * @param app
 */
export async function swagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  // Secure the Swagger UI with basic authentication
  app.use(
    [
      `/${configService.get('API-DOCS')}`,
      `/${configService.get('API-DOCS')}-json`,
    ], // Paths to protect
    basicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USER')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(
      `${configService.get('APP_NAME')} Backend API for ${configService.get(
        'NODE_ENV',
      )} profile`,
    )
    .setDescription(
      'API Documentation\
     \n NOTE: The API with (LOCK) symbol can be used only after providing Login API response token in (Authorize)\
     \n -Parameter with * are required to execute related API',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'basic',
      name: 'x-access-token',
      in: 'header',
    })
    .addBasicAuth({
      type: 'http',
      scheme: 'Basic',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
    deepScanRoutes: true,
    // ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup(configService.get('API-DOCS'), app, document, {
    customSiteTitle: 'API',
    explorer: false,
  });
}
