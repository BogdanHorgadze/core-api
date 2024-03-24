import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: '.env' });

const { DB_PORT, DB_PASS, DB_USER, DB_NAME, DB_HOST } = process.env;

const config = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  migrations: [join(__dirname, 'src/migrations/*.ts')],
  entities: [join(__dirname, 'src/entities/**/*.ts')],
});

export default config;
