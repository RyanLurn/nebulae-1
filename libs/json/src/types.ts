export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [K in string]: JsonValue };
export type JsonArray = JsonValue[] | readonly JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonifiableObject =
  | { [K in string]?: Jsonifiable }
  | { toJSON: () => Jsonifiable };
export type JsonifiableArray = readonly Jsonifiable[];
export type Jsonifiable = JsonPrimitive | JsonifiableObject | JsonifiableArray;
