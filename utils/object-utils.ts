type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never;
// deno-lint-ignore no-explicit-any
type ShallowRecord<K extends keyof any, T> = DrainOuterGeneric<
  {
    [P in K]: T;
  }
>;

export function isEmpty(obj: ArrayLike<unknown> | string | object): boolean {
  if (Array.isArray(obj) || isString(obj) || isBuffer(obj)) {
    return obj.length === 0;
  } else if (obj) {
    return Object.keys(obj).length === 0;
  }

  return false;
}

export function isUndefined(obj: unknown): obj is undefined {
  return typeof obj === "undefined" || obj === undefined;
}

export function isString(obj: unknown): obj is string {
  return typeof obj === "string";
}

export function isNumber(obj: unknown): obj is number {
  return typeof obj === "number";
}

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === "boolean";
}

export function isNull(obj: unknown): obj is null {
  return obj === null;
}

export function isDate(obj: unknown): obj is Date {
  return obj instanceof Date;
}

export function isBigInt(obj: unknown): obj is bigint {
  return typeof obj === "bigint";
}

export function isBuffer(obj: unknown): obj is { length: number } {
  // @ts-ignore Don't change the returnd type to `obj is Buffer` to not create a hard dependency to node.
  return typeof Buffer !== "undefined" && Buffer.isBuffer(obj);
}

// deno-lint-ignore ban-types
export function isFunction(obj: unknown): obj is Function {
  return typeof obj === "function";
}

export function isObject(obj: unknown): obj is ShallowRecord<string, unknown> {
  return typeof obj === "object" && obj !== null;
}

export function isArrayBufferOrView(
  obj: unknown,
): obj is ArrayBuffer | ArrayBufferView {
  return obj instanceof ArrayBuffer || ArrayBuffer.isView(obj);
}

export function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  return (
    isObject(obj) &&
    !Array.isArray(obj) &&
    !isDate(obj) &&
    !isBuffer(obj) &&
    !isArrayBufferOrView(obj)
  );
}

export function getLast<T>(arr: ArrayLike<T>): T | undefined {
  return arr[arr.length - 1];
}

export function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

export function asArray<T>(arg: T | ReadonlyArray<T>): ReadonlyArray<T> {
  if (isReadonlyArray(arg)) {
    return arg;
  } else {
    return [arg];
  }
}

export function asReadonlyArray<T>(
  arg: T | ReadonlyArray<T>,
): ReadonlyArray<T> {
  if (isReadonlyArray(arg)) {
    return arg;
  } else {
    return freeze([arg]);
  }
}

export function isReadonlyArray(arg: unknown): arg is ReadonlyArray<unknown> {
  return Array.isArray(arg);
}

export function noop<T>(obj: T): T {
  return obj;
}
