export const envConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbHost: process.env.MYSQL_HOST,
  dbPort: process.env.MYSQL_PORT,
  dbUsername: process.env.MYSQL_USER,
  dbUserPassword: process.env.MYSQL_ROOT_PASSWORD,
  dbName: process.env.MYSQL_DB_NAME,
  dbRootPassword: process.env.MYSQL_ROOT_PASSWORD,
});
