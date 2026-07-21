import type { Result } from "@repo/result";

import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

import type { JsonValue } from "@/types";

import { JsonParseError } from "@/lib/error";

export function parseJsonString(
  ...params: Parameters<typeof JSON.parse>
): Result<JsonValue, JsonParseError | UnexpectedError> {
  try {
    const jsonValue = JSON.parse(...params) as JsonValue;
    return ok(jsonValue);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return err(new JsonParseError({ cause: error }));
    }
    return err(
      new UnexpectedError({
        action: "parse JSON string",
        cause: error,
      }),
    );
  }
}
