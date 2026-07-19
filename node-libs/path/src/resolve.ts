import { resolve } from "node:path";

import type { AbsolutePath } from "@/types";

export function resolvePath(...paths: string[]): AbsolutePath {
  return resolve(...paths) as AbsolutePath;
}
