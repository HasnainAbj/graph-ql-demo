import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService, Logger],
  exports: [ConfigService, Logger],
})
export class ConfigModule {}
