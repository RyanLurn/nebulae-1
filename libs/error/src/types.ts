export interface AppError<Code extends string> extends Error {
  code: Code;
}

export interface FlatError<Code extends string> {
  name: string;
  message: string;
  code: Code;
}
