import convict from 'convict';
import { Schema } from './contracts/index.js';
import { EnvVariable } from './constants/index.js';

export const configSchema = convict<Schema>({
  PORT: {
    doc: 'Connection port',
    format: 'port',
    env: EnvVariable.PORT,
    default: 9000,
  },
  DB_HOST: {
    doc: 'Database IP address',
    env: EnvVariable.DB_HOST,
    default: '127.0.0.1',
  },
  SALT: {
    doc: 'Salt',
    env: EnvVariable.SALT,
    default: '',
  },
  DB_USER: {
    doc: 'Username to connect to the database (MongoDB)',
    format: String,
    env: EnvVariable.DB_USER,
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Database connection password (MongoDB)',
    format: String,
    env: EnvVariable.DB_PASSWORD,
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: EnvVariable.DB_PORT,
    default: 27017,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: EnvVariable.DB_NAME,
    default: 'what-to-watch',
  },
  API_PREFIX: {
    doc: 'API prefix',
    format: String,
    env: EnvVariable.API_PREFIX,
    default: '/api/v1/',
  },
  UPLOAD_FILES_DIRECTORY: {
    doc: 'Directory for uploaded files.',
    format: String,
    env: EnvVariable.UPLOAD_FILES_DIRECTORY,
    default: null,
  },
  SECRET_JWT: {
    doc: 'Secret for JWT sign.',
    format: String,
    env: EnvVariable.SECRET_JWT,
    default: null,
  },
  STATIC_FILES_DIRECTORY: {
    doc: 'Directory for static files.',
    format: String,
    env: EnvVariable.STATIC_FILES_DIRECTORY,
    default: null,
  },
  HOST: {
    doc: 'Site address.',
    format: String,
    env: EnvVariable.HOST,
    default: '127.0.0.1',
  },
  JWT_EXPIRATION_TIME: {
    doc: 'JWT-token expriration lifetime.',
    format: String,
    env: EnvVariable.JWT_EXPIRATION_TIME,
    default: '2d',
  },
});
