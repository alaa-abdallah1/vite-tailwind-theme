import { Mixed } from "../types";

export const isString = (value: Mixed): value is string =>
  typeof value === "string";

export const isObject = <T = object>(value: T): value is T =>
  value?.constructor === Object;

export const isNumber = (value: Mixed): value is number =>
  !isNaN(value) &&
  ![false, true, null, undefined].includes(value) &&
  String(value).replace(/\s+/g, "") !== "";

export const getNestedKey = <T = unknown>(
  obj: unknown,
  path: string,
  defaultValue?: T
): T | undefined => {
  if (!isObject(obj) || !isString(path)) return defaultValue;

  return path.split(".").reduce<any>((acc, key) => {
    return isObject(acc) && key in acc ? acc[key] : defaultValue;
  }, obj);
};
