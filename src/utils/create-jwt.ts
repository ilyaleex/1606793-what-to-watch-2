import * as jose from 'jose';
import crypto from 'crypto';

export const createJWT = async (
  algoritm: string,
  jwtSecret: string,
  expirationTime: string,
  payload: object
): Promise<string> =>
  new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algoritm })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
