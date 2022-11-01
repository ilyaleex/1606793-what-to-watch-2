import { plainToInstance, ClassConstructor } from 'class-transformer';

export const processDto = <T, V>(dto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(dto, plainObject, { excludeExtraneousValues: true });
