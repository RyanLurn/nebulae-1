import type { AppError } from "@repo/error";

export interface Ok<D> {
  ok: true;
  data: D;
  metadata?: Record<string, unknown>;
}

export interface Err<E extends AppError<string>> {
  ok: false;
  error: E;
  metadata?: Record<string, unknown>;
}

export type Result<D, E extends AppError<string>> = Ok<D> | Err<E>;
