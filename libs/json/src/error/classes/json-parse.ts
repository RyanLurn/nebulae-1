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
