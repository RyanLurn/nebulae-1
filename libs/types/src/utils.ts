export type OmitKnownKeys<T, K extends keyof T> = Omit<T, K>;

export type ValuesOf<T extends object> = T[keyof T];
