import { SqliteDriver } from "@/utils/sqlite_driver.ts";
import {
  ColumnType,
  Generated,
  Kysely,
  Selectable,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";

interface ApkInfoTable {
  id: Generated<number>;
  app_name: string;
  app_size: number;
  md5: string;
  fid: string;
  down_url: string;
  upload_at: ColumnType<Date, string | undefined, never>;
}

export type ApkInfo = Selectable<ApkInfoTable>;

export interface DbSchema {
  apk_info: ApkInfoTable;
}

// Singleton
export class Db {
  static #instance: Kysely<DbSchema>;

  private constructor() {
  }

  public static getInstance(): Kysely<DbSchema> {
    if (!Db.#instance) {
      Db.#instance = Db.#initDb();
    }

    return Db.#instance;
  }

  static #initDb() {
    return new Kysely<DbSchema>({
      dialect: {
        createAdapter() {
          return new SqliteAdapter();
        },
        createDriver() {
          return new SqliteDriver("./.db/den.db");
        },
        createIntrospector(db: Kysely<unknown>) {
          return new SqliteIntrospector(db);
        },
        createQueryCompiler() {
          return new SqliteQueryCompiler();
        },
      },
    });
  }
}
