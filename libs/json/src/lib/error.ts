import { BaseError } from "@repo/error";

export class JsonParseError extends BaseError<"JSON_PARSE_ERROR", SyntaxError> {
  readonly name = "JsonParseError";
  readonly code = "JSON_PARSE_ERROR";

  constructor({ cause }: { cause: SyntaxError }) {
    super({
      message: "Failed to parse text because it's not valid JSON.",
      cause,
    });
  }
}

export class JsonStringifyError extends BaseError<
  "JSON_STRINGIFY_ERROR",
  TypeError
> {
  readonly name = "JsonStringifyError";
  readonly code = "JSON_STRINGIFY_ERROR";

  constructor({ cause }: { cause: TypeError }) {
    super({
      message:
        "Failed to stringify value because it contains a circular reference or a BigInt value is encountered.",
      cause,
    });
  }
}
