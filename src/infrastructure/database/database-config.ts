export const getDatabaseConfig = () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_HOST || 'testdb',
  syncronize: false,
});