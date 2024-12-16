import { Global, Module } from '@nestjs/common';
import { DatabaseConfig } from './database.config';
import { databaseProviders } from './database.provider';
import { UserProvider } from 'src/providers/user.provider';

const provider = [DatabaseConfig, databaseProviders, ...UserProvider];

@Global()
@Module({
  providers: [...provider],
  exports: [...provider],
})
export class DatabaseModule {}
