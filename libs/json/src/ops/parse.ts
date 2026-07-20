import type { Result } from "@repo/result";

import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

import { InvalidJsonError } from "@/error/classes/invalid-json";

export function parseJsonString(
  ...params: Parameters<typeof JSON.parse>
): Result<any, InvalidJsonError | UnexpectedError> {
  try {
    const value = JSON.parse(...params);
    return ok(value);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return err(new InvalidJsonError({ text: params[0], cause: error }));
    }
    return err(
      new UnexpectedError({
        action: "parse JSON string",
        cause: error,
      }),
    );
  }
}
