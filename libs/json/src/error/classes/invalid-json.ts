import { BaseError } from "@repo/error";

export class InvalidJsonError extends BaseError<
  "INVALID_JSON_ERROR",
  SyntaxError
> {
  readonly name = "InvalidJsonError";
  readonly code = "INVALID_JSON_ERROR";
  readonly text: string;

  constructor({ text, cause }: { text: string; cause: SyntaxError }) {
    super({
      message: "Failed to parse input text because it's not valid JSON.",
      cause,
    });
    this.text = text;
  }
}
