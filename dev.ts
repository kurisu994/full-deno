#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

import { init } from "@/utils/db_migration.ts";
import { existsSync } from "https://deno.land/std@0.216.0/fs/exists.ts";
import { emptyDirSync } from "https://deno.land/std@0.216.0/fs/empty_dir.ts";

await dev(import.meta.url, "./main.ts", {
  ...config,
  server: {
    async onListen(params) {
      const DB_DIR = "./.db";
      if (!existsSync(DB_DIR)) {
        emptyDirSync(DB_DIR);
      }
      await init();
      console.info("");
      console.info(`    Local: http://${params.hostname}:${params.port}`);
    },
  },
});
