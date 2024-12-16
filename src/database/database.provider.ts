import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseConfig } from './database.config';
import { User } from '../models';

export const databaseProviders = {
  provide: 'SEQUELIZE',
  useFactory: async (databaseConfig: DatabaseConfig) => {
    const config = databaseConfig.readConfiguration();
    const sequelize = new Sequelize(config);
    sequelize.addModels([User]);

    if (config.sync.force) {
      console.log('********** DB seeding started **********');
      await sequelize.sync({ force: config.sync.force }).catch((err) => {
        console.log('********** Error in database sedding **********', err);
      });
    }

    Logger.log('Database connected!');

    return sequelize;
  },
  inject: [DatabaseConfig],
};
