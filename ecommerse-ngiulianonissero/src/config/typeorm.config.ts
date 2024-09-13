import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } from './envs';
import { registerAs } from '@nestjs/config';

const typeOrmConfig = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export default registerAs('typeorm', () => typeOrmConfig);

export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
