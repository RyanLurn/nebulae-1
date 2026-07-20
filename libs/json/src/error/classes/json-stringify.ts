import { BaseError } from "@repo/error";

export class JsonStringifyError extends BaseError<
  "JSON_STRINGIFY_ERROR",
  TypeError
> {
  readonly name = "JsonStringifyError";
  readonly code = "JSON_STRINGIFY_ERROR";
  readonly value: unknown;

  constructor({ value, cause }: { value: unknown; cause: TypeError }) {
    super({
      message: `Failed to stringify value because ${typeof value === "bigint" ? "it's a BigInt" : "contains a circular reference"}.`,
      cause,
    });
    this.value = value;
  }
}
