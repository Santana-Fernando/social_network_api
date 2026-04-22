import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Fern@nd01331',
  database: 'social_network',
  entities: [
    "dist/infrastructure/database/entities/*.js"
  ],
  synchronize: true
});