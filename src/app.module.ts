import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import * as process from 'process';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import config from '../config/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        logging: configService.get('database.logging'),
        namingStrategy: new SnakeNamingStrategy(),
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        migrationsTableName: 'migrations',
        migrationsRun: true,
        maxQueryExecutionTime: 3000,
        migrations: [resolve(__dirname, '../migrations/*.{ts,js}')],
        migrationsTransactionMode: 'all',
        autoLoadEntities: true,
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env-${process.env.NODE_ENV?.trim() || 'dev'}`,
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
