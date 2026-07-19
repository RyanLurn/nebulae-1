import { BaseError } from "@/classes/base";

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  readonly name = "UnexpectedError";
  readonly code = "UNEXPECTED_ERROR";

  constructor({ action, cause }: { action: string; cause: unknown }) {
    super({
      message: `Failed to ${action} because of an unexpected ${cause instanceof Error ? cause.name : "non-Error exception"}.`,
      cause,
    });
  }
}
