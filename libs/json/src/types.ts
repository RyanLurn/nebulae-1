export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [K in string]: JsonValue };
export type JsonArray = JsonValue[] | readonly JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonifiableObject =
  | { [K in string]?: JsonifiableValue }
  | { toJSON: () => JsonifiableValue };
export type JsonifiableArray = readonly JsonifiableValue[];
export type JsonifiableValue =
  | JsonPrimitive
  | JsonifiableObject
  | JsonifiableArray;

export type JsonStringifyReplacerFunction = (
  this: any,
  key: string,
  value: any,
) => any;
export type JsonStringifyReplacerArray = (number | string)[];
export type JsonStringifySpace = string | number;

export type StringifyJsonifiableValueReplacerFunction = (
  this: JsonifiableValue,
  key: string,
  value: JsonifiableValue,
) => JsonifiableValue;
