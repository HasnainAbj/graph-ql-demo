import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IEnvConfig } from './config.interface';
import * as dotenv from 'dotenv';

dotenv.config();
/**
 * This class will parse environment configuration and server on demand
 */
@Injectable()
export class ConfigService {
  private envConfig: IEnvConfig;

  constructor(@Inject(Logger) private readonly logger: LoggerService) {
    this.loadEnvFile();
  }

  /**
   * used to get current working environment and log on console
   */

  public workingEnvironmentLog() {
    this.logger.log(
      `Application is running on [[--${this.getProfile()}--]] profile`,
      ConfigService.name,
    );
  }

  getProfile() {
    if (process.env.NODE_ENV) {
      return process.env.NODE_ENV;
    }
    if (this.envConfig.NODE_ENV) {
      return this.envConfig.NODE_ENV;
    }
  }

  /**
   * used to get each environment varible by its name, this function will get the env variable from file
   * @param key
   */
  get(key: string): string {
    try {
      if (process.env[key]) {
        return process.env[key];
      } else if (this.envConfig[key]) {
        return this.envConfig[key];
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * used to check that environment is running on development or not
   */
  isDev(): boolean {
    return this.getProfile() === 'development';
  }

  /**
   * used to check that environment is running on production or not
   */
  isProd(): boolean {
    return this.getProfile() === 'production';
  }

  private loadEnvFile() {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    try {
      const envFile = resolve(process.cwd(), filePath);
      this.envConfig = <IEnvConfig>parse(readFileSync(envFile));
    } catch (e) {
      console.log(`env file not found ${filePath}, ${e.message}`);
    }
  }
}
