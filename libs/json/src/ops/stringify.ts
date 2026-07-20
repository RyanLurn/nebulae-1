import type { Result } from "@repo/result";

import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

import { JsonStringifyError } from "@/error/classes/json-stringify";

export function stringifyValueToJson(
  ...params: Parameters<typeof JSON.stringify>
): Result<string, JsonStringifyError | UnexpectedError> {
  try {
    const value = JSON.stringify(...params);
    return ok(value);
  } catch (error) {
    if (error instanceof TypeError) {
      return err(new JsonStringifyError({ value: params[0], cause: error }));
    }
    return err(
      new UnexpectedError({
        action: "parse JSON string",
        cause: error,
      }),
    );
  }
}
