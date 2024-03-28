import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { init } from "@/utils/db_migration.ts";
import { existsSync } from "https://deno.land/std@0.216.0/fs/exists.ts";
import { emptyDirSync } from "https://deno.land/std@0.216.0/fs/empty_dir.ts";

const DB_DIR = "./.db";
if (!existsSync(DB_DIR)) {
  emptyDirSync(DB_DIR);
}
await init();

export default defineConfig({
  plugins: [tailwind()],
});
