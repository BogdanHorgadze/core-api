import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import PostEntity from '@entities/post.entity';

dotenvConfig({ path: '.env' });

const { DB_PORT, DB_PASS, DB_USER, DB_NAME, DB_HOST } = process.env;

console.log(DB_PORT);
console.log(DB_HOST);
console.log(DB_USER);
console.log(DB_NAME);
console.log(DB_PASS);

const config = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  migrations: [],
  entities: [PostEntity],
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
