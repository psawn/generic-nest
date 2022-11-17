import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        replication: {
          master: {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Bao123456.',
            database: 'nest-test',
          },
          slaves: [
            {
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'Bao123456.',
              database: 'nest-test',
            },
          ],
        },
        entities: ['dist/**/*.entity.js'],
        logging: true,
        synchronize: true,
        migrationsRun: true,
        migrationsTransactionMode: 'each',
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
