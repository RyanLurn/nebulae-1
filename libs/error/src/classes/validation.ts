import type { SchemaError } from "@standard-schema/utils";
import type { ErrorObject } from "serialize-error";

import { getDotPath } from "@standard-schema/utils";

import type {
  FlatError,
  FlatSerializeOptions,
  NestedSerializeOptions,
  SerializeErrorOptions,
} from "@/types";

import { BaseError } from "@/classes/base";
import { serializeNestedError } from "@/serialize-nested-error";

export interface FlatIssues {
  formErrors: string[];
  fieldErrors: Record<string, string[]>;
}

type ValidationErrorCode = "VALIDATION_ERROR";

interface FlatValidationError extends FlatError<ValidationErrorCode> {
  issues: FlatIssues;
}

export class ValidationError extends BaseError<
  ValidationErrorCode,
  SchemaError
> {
  readonly name = "ValidationError";
  readonly code = "VALIDATION_ERROR";
  readonly issues: SchemaError["issues"];

  constructor({ message, cause }: { message?: string; cause: SchemaError }) {
    super({ message: message ?? cause.message, cause });
    this.issues = cause.issues;
  }

  getFlatIssues(): FlatIssues {
    const formErrors: FlatIssues["formErrors"] = [];
    const fieldErrors: FlatIssues["fieldErrors"] = {};

    for (const issue of this.issues) {
      const dotPath = getDotPath(issue);
      if (typeof dotPath === "string") {
        if (fieldErrors[dotPath]) {
          fieldErrors[dotPath].push(issue.message);
        } else {
          fieldErrors[dotPath] = [issue.message];
        }
      } else {
        formErrors.push(issue.message);
      }
    }
    return { formErrors, fieldErrors };
  }

  override serialize(options?: FlatSerializeOptions): FlatValidationError;
  override serialize(options: NestedSerializeOptions): ErrorObject;
  override serialize(
    options: SerializeErrorOptions = { mode: "flat" },
  ): FlatValidationError | ErrorObject {
    if (options.mode === "flat") {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
        issues: this.getFlatIssues(),
      };
    }
    return serializeNestedError(this, options);
  }
}
