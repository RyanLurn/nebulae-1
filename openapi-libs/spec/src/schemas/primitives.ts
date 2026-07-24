import { z } from "zod";

export const OpenApiIntegerSchema = z.int32();
export type OpenApiInteger = z.infer<typeof OpenApiIntegerSchema>;

export const OpenApiLongSchema = z.int64();
export type OpenApiLong = z.infer<typeof OpenApiLongSchema>;
