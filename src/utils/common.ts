import {Film} from '../types/types.js';
import crypto from 'crypto';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import * as jose from 'jose';
import {ValidationError} from 'class-validator';
import {ValidationErrorField} from '../types/validation-error-field.type.js';
import {ServiceError} from '../types/service-error.enum.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    name,
    description,
    postDate,
    genre,
    releaseYear,
    rating,
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime,
    commentsCount,
    posterImage,
    bgImage,
    bgColor,
    userName,
    email,
    avatarPath,
    password
  ] = tokens;

  return {
    name,
    description,
    postDate: new Date(postDate),
    genre,
    releaseYear: Number.parseInt(releaseYear, 10),
    rating: Number.parseFloat(rating),
    previewVideoLink,
    videoLink,
    starring: starring.split(','),
    director,
    runTime: Number.parseInt(runTime, 10),
    commentsCount: Number.parseInt(commentsCount, 10),
    posterImage,
    bgImage,
    bgColor,
    user: {userName, email, avatarPath, password},
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};
