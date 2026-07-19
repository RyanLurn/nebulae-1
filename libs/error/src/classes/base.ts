import type { ErrorObject } from "serialize-error";

import type {
  AppError,
  FlatError,
  FlatSerializeOptions,
  NestedSerializeOptions,
  SerializeErrorOptions,
} from "@/types";

import { serializeNestedError } from "@/serialize-nested-error";

export abstract class BaseError<Code extends string, Cause = unknown>
  extends Error
  implements AppError<Code>
{
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract readonly code: Code;
  declare cause: Cause;

  constructor({ message, cause }: { message: string; cause: Cause }) {
    super(message, { cause });
  }

  serialize(options?: FlatSerializeOptions): FlatError<Code>;
  serialize(options: NestedSerializeOptions): ErrorObject;
  serialize(
    options: SerializeErrorOptions = { mode: "flat" },
  ): FlatError<Code> | ErrorObject {
    if (options.mode === "flat") {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
      };
    }
    return serializeNestedError(this, options);
  }
}
