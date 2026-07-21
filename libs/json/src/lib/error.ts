import { BaseError } from "@repo/error";

export class JsonParseError extends BaseError<"JSON_PARSE_ERROR", SyntaxError> {
  readonly name = "JsonParseError";
  readonly code = "JSON_PARSE_ERROR";
  readonly text: string;

  constructor({ text, cause }: { text: string; cause: SyntaxError }) {
    super({
      message: "Failed to parse text because it's not valid JSON.",
      cause,
    });
    this.text = text;
  }
}

export class JsonStringifyError extends BaseError<
  "JSON_STRINGIFY_ERROR",
  TypeError
> {
  readonly name = "JsonStringifyError";
  readonly code = "JSON_STRINGIFY_ERROR";
  readonly value: unknown;

  constructor({ value, cause }: { value: unknown; cause: TypeError }) {
    super({
      message:
        "Failed to stringify value because it contains a circular reference or a BigInt value is encountered.",
      cause,
    });
    this.value = value;
  }
}
