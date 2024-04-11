import { Db } from "./db.ts";
import { fileSize } from "@/utils/helper.ts";
import { getFileURL } from "@/utils/helper.ts";

export type ApkInfoRow = {
  id: number;
  appName: string;
  appSize: string;
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
    ).orderBy("upload_at asc")
    .limit(limit)
    .offset(0)
    .execute();
  let list: ApkInfoRow[] = [];
  if (results) {
    list = results.map((p) => ({
      id: p.id,
      appName: p.app_name,
      appSize: fileSize(p.app_size),
      md5: p.md5,
      downUrl: p.down_url,
      uploadAt: p.upload_at,
    }));
  }
  return list;
}

export type IApk =
  & Pick<
    ApkInfoRow,
    "appName" | "md5"
  >
  & { fid: string; appSize: number };

export async function saveData(data: IApk): Promise<string> {
  const db = Db.getInstance();
  const resultsByFid = await db.selectFrom("apk_info").select(["fid"])
    .where("fid", "=", data.fid)
    .execute();
  if (resultsByFid && resultsByFid.length > 0) {
    return resultsByFid[0].fid;
  }

  const resultsByMd5 = await db.selectFrom("apk_info").select(["fid"])
    .where("md5", "=", data.md5)
    .execute();
  if (resultsByMd5 && resultsByMd5.length > 0) {
    return resultsByMd5[0].fid;
  }

  await db
    .insertInto("apk_info")
    .values({
      app_name: data.appName,
      app_size: data.appSize,
      md5: data.md5,
      fid: data.fid,
      down_url: getFileURL(data.fid),
      upload_at: Date(),
    })
    .executeTakeFirstOrThrow();

  return data.fid;
}
