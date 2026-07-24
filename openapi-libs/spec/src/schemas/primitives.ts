import { z } from "zod";

export const OpenApiIntegerSchema = z.int32();
export type OpenApiInteger = z.infer<typeof OpenApiIntegerSchema>;
