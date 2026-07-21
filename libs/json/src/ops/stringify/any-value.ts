import type { Result } from "@repo/result";

import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

import type {
  JsonStringifySpace,
  JsonStringifyReplacerFunction,
  JsonStringifyReplacerArray,
} from "@/types";

import { JSON_STRING_DEFAULT_SPACE } from "@/constants";
import { JsonStringifyError } from "@/lib/error";

export function stringifyAnyValueToJson({
  value,
  space = JSON_STRING_DEFAULT_SPACE,
}: {
  value: any;
  space?: JsonStringifySpace;
}): Result<string, JsonStringifyError | UnexpectedError> {
  try {
    const jsonString = JSON.stringify(value, null, space);
    return ok(jsonString);
  } catch (error) {
    if (error instanceof TypeError) {
      return err(new JsonStringifyError({ value, cause: error }));
    }
    return err(
      new UnexpectedError({
        action: `stringify the given ${typeof value}-type value to JSON`,
        cause: error,
      }),
    );
  }
}

export function stringifyAnyValueToJsonWithReplacerFunction({
  value,
  replacer,
  space = JSON_STRING_DEFAULT_SPACE,
}: {
  value: any;
  replacer?: JsonStringifyReplacerFunction;
  space?: JsonStringifySpace;
}): Result<string, JsonStringifyError | UnexpectedError> {
  try {
    const jsonString = JSON.stringify(value, replacer, space);
    return ok(jsonString);
  } catch (error) {
    if (error instanceof TypeError) {
      return err(new JsonStringifyError({ value, cause: error }));
    }
    return err(
      new UnexpectedError({
        action: `stringify the given ${typeof value}-type value to JSON with a replacer function`,
        cause: error,
      }),
    );
  }
}

export function stringifyAnyValueToJsonWithReplacerArray({
  value,
  replacer,
  space = JSON_STRING_DEFAULT_SPACE,
}: {
  value: any;
  replacer?: JsonStringifyReplacerArray;
  space?: JsonStringifySpace;
}): Result<string, JsonStringifyError | UnexpectedError> {
  try {
    const jsonString = JSON.stringify(value, replacer, space);
    return ok(jsonString);
  } catch (error) {
    if (error instanceof TypeError) {
      return err(new JsonStringifyError({ value, cause: error }));
    }
    return err(
      new UnexpectedError({
        action: `stringify the given ${typeof value}-type value to JSON with a replacer array`,
        cause: error,
      }),
    );
  }
}
