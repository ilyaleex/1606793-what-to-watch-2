type Schema = {
  PORT: number;
  HOST: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  SALT: string;
  API_PREFIX: string;
  UPLOAD_FILES_DIRECTORY: string;
  SECRET_JWT: string;
  STATIC_FILES_DIRECTORY: string;
  JWT_EXPIRATION_TIME: string;
};

export default Schema;
