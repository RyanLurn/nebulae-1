import type { AppError } from "@repo/error";

import type { Err, Ok } from "@/types";

export function ok<D>(data: D, metadata: unknown = null): Ok<D> {
  return {
    ok: true,
    data,
    metadata,
  };
}

export function err<E extends AppError<string>>(
  error: E,
  metadata: unknown = null,
): Err<E> {
  return {
    ok: false,
    error,
    metadata,
  };
}
