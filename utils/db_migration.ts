import { Kysely, sql } from "kysely";
import { Db, DbSchema } from "@/utils/db.ts";

const TABLE_NAME = "apk_info";

export async function init(): Promise<void> {
  console.info('starting check db')
  const db = Db.getInstance();
  await db.schema
    .createTable(TABLE_NAME)
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("app_name", "text", (col) => col.notNull())
    .addColumn("app_size", "integer", (col) => col.notNull())
    .addColumn("md5", "text", (col) => col.notNull())
    .addColumn("fid", "text", (col) => col.notNull())
    .addColumn("down_url", "text", (col) => col.notNull())
    .addColumn(
      "upload_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
    console.info('check db over!')
}

async function up(db: Kysely<DbSchema>): Promise<void> {
}

async function down(db: Kysely<DbSchema>): Promise<void> {
  await db.schema.dropTable(TABLE_NAME).ifExists().execute();
}

async function run() {
  const { args } = Deno;

  const db = Db.getInstance();

  if (args.includes("--up")) {
    await up(db);
  } else if (args.includes("--down")) {
    await down(db);
  } else {
    await down(db);
    await up(db);
  }
}

// Run only when executed as a script via `deno run` or `deno task`
if (import.meta.main) {
  run();
}
