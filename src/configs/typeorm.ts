import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

import { AddYearTable1711149413321 } from '@migrations/1711149413321-AddYearTable';
import { AddGenreTable1711228481191 } from '@migrations/1711228481191-AddGenreTable';
import { AddAnimeTable1711240119689 } from '@migrations/1711240119689-AddAnimeTable';

import { Year } from '@entities/kodik/Year';
import { Genre } from '@entities/kodik/Genre';
import { Anime } from '@entities/kodik/Anime';

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
  migrations: [
    AddYearTable1711149413321,
    AddGenreTable1711228481191,
    AddAnimeTable1711240119689,
  ],
  entities: [Year, Genre, Anime],
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
