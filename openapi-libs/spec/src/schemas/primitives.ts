import { z } from "zod";

export const OpenApiIntegerSchema = z.int();
export type OpenApiInteger = z.infer<typeof OpenApiIntegerSchema>;
