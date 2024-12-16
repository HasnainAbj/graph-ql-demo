import { Inject, Injectable } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';
import { ConfigService } from '../config/config.service';

@Injectable()
/**
 * This class is used to establish database connection and useful for parse environment variables
 */
export class DatabaseConfig {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  /**
   * read environment file and load database configuration accordingly
   */
  public readConfiguration(): SequelizeModuleOptions {
    return {
      timezone: 'UTC',
      dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
      dialect: (this.configService.get('DB_DIALECT') as Dialect) || 'postgres',
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get('DB_PORT'),
      password: this.configService.get('DB_PASS'),
      username: this.configService.get('DB_USER'),
      database: this.configService.get('DB_NAME'),
      logging: false,
      pool: {
        max: +this.configService.get('DB_POOL_MAX'),
        min: +this.configService.get('DB_POOL_MIN'),
        acquire: +this.configService.get('DB_POOL_ACQUIRE'),
        idle: +this.configService.get('DB_POOL_IDLE'),
      },
      synchronize: true,
      sync: {
        force: this.configService.get('DB_SYNC') == '1',
      },
    };
  }
}
