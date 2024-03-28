/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

import { init } from "@/utils/db_migration.ts";
import { existsSync } from "https://deno.land/std@0.216.0/fs/exists.ts";
import { emptyDirSync } from "https://deno.land/std@0.216.0/fs/empty_dir.ts";

const DB_DIR = "./.db";
if (!existsSync(DB_DIR)) {
  emptyDirSync(DB_DIR);
}
await init();

await start(manifest, config);
