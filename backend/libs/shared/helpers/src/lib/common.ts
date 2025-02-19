import { File, SERVE_ROOT } from '@backend/shared/core';
import {
  ClassTransformOptions,
  plainToInstance,
  Transform,
} from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}

export function createUrlForFile(fileMetaData: File): string {
  const subDirectory = fileMetaData.subDirectory.replace('\\', '/');
  return `${subDirectory}/${fileMetaData.hashName}`;
}

export function createStaticUrlForFile(filepath: string, host: string): string {
  return `${host}/${SERVE_ROOT}/${filepath}`;
}

export function transformToArray<T>(value: T): Array<T> {
  return Array.isArray(value) ? value : [value];
}

export function TransformToArray() {
  return Transform(({ value }) => transformToArray(value));
}

export function TransformToNumberArray() {
  return Transform(({ value }) =>
    transformToArray(value).map((value) => parseInt(value, 10))
  );
}

export function generateArticleNumber(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  return Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }).join('');
}

export function generateRandomDate(start: Date, end: Date) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime =
    Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;

  return new Date(randomTime);
}

export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}
