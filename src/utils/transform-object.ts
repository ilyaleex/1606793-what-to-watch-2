import { UnknownObject } from '../contracts/index.js';
import { DEFAULT_STATIC_IMAGES } from '../constants/index.js';

const isObject = (value: unknown) =>
  typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  targetObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(targetObject).forEach((key) => {
    if (property === key) {
      transformFn(targetObject);
    } else if (isObject(targetObject[key])) {
      transformProperty(
        property,
        targetObject[key] as UnknownObject,
        transformFn
      );
    }
  });
};

export const transformObject = (
  properties: string[],
  staticPath: string,
  uploadPath: string,
  data: UnknownObject
) => {
  properties.forEach((property) => {
    transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(
        target[property] as string
      )
        ? staticPath
        : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    });
  });
};
