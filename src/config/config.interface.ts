import { DotenvParseOutput } from 'dotenv';

export interface IConfig extends DotenvParseOutput {
  APP_ENV: string;
  PORT: string;
}

export interface IEnvConfig extends IConfig {
  APP_NAME?: string;
}
