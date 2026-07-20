export const HTTP_REQUEST_METHODS = {
  GET: {
    method: "GET",
    safe: true,
    idempotent: true,
    cacheable: true,
  },
  POST: {
    method: "POST",
    safe: false,
    idempotent: false,
    cacheable: "conditional",
  },
  DELETE: {
    method: "DELETE",
    safe: false,
    idempotent: true,
    cacheable: false,
  },
  PUT: {
    method: "PUT",
    safe: false,
    idempotent: true,
    cacheable: false,
  },
  PATCH: {
    method: "PATCH",
    safe: false,
    idempotent: false,
    cacheable: "conditional",
  },
  HEAD: {
    method: "HEAD",
    safe: true,
    idempotent: true,
    cacheable: true,
  },
  OPTIONS: {
    method: "OPTIONS",
    safe: true,
    idempotent: true,
    cacheable: false,
  },
  TRACE: {
    method: "TRACE",
    safe: true,
    idempotent: true,
    cacheable: false,
  },
  CONNECT: {
    method: "CONNECT",
    safe: false,
    idempotent: false,
    cacheable: false,
  },
} as const;
