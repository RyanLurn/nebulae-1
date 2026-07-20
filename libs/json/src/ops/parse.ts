import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

export function parseJsonString(...params: Parameters<typeof JSON.parse>) {
  try {
    const value = JSON.parse(...params);
    return ok(value);
  } catch (error) {
    return err(
      new UnexpectedError({
        action: "parse JSON string",
        cause: error,
      }),
    );
  }
}
