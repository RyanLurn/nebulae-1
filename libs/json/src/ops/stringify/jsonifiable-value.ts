import type {
  JsonifiableValue,
  JsonStringifyReplacerArray,
  JsonStringifySpace,
  StringifyJsonifiableValueReplacerFunction,
} from "@/types";

import { JSON_STRING_DEFAULT_SPACE } from "@/constants";

export function stringifyJsonifiableValue({
  value,
  space = JSON_STRING_DEFAULT_SPACE,
}: {
  value: JsonifiableValue;
  space?: JsonStringifySpace;
}) {
  const jsonString = JSON.stringify(value, null, space);
  return jsonString;
}

export function stringifyJsonifiableValueWithReplacerFunction({
  value,
  replacer,
  space = JSON_STRING_DEFAULT_SPACE,
}: {
  value: JsonifiableValue;
  replacer?: StringifyJsonifiableValueReplacerFunction;
  space?: JsonStringifySpace;
}) {
  const jsonString = JSON.stringify(value, replacer, space);
  return jsonString;
}

export function stringifyJsonifiableValueWithReplacerArray({
  value,
  replacer,
  space = JSON_STRING_DEFAULT_SPACE,
}: {
  value: JsonifiableValue;
  replacer?: JsonStringifyReplacerArray;
  space?: JsonStringifySpace;
}) {
  const jsonString = JSON.stringify(value, replacer, space);
  return jsonString;
}
