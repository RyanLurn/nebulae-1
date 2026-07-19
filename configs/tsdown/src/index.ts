import type { UserConfig } from "tsdown";

export const libConfig = {
  entry: "src/index.ts",
  exports: true,
  dts: true,
} as const satisfies UserConfig;
