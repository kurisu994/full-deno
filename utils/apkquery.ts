import { Db } from "./db.ts";

export type ApkInfoRow = {
  id: number;
  appName: string;
  appSize: number;
  md5: string;
  downUrl: string;
  uploadAt: Date;
};

export async function queryByKw(kw = "", limit = 10) {
  const db = Db.getInstance();
  const results = await db.selectFrom("apk_info").selectAll()
    .where((eb) =>
      eb.or([
        eb("fid", "=", kw),
        eb("app_name", "like", `%${kw}%`),
      ])
    )
    .limit(limit)
    .execute();
  let list: ApkInfoRow[] = [];
  if (results) {
    list = results.map((p) => ({
      id: p.id,
      appName: p.app_name,
      appSize: p.app_size,
      md5: p.md5,
      downUrl: p.down_url,
      uploadAt: p.upload_at,
    }));
  }
  return list;
}
