import { Handlers } from "$fresh/server.ts";
import { Db } from "@/utils/db.ts";

export const handler: Handlers<string | null> = {
  async POST(_req, ctx) {
    try {
      const md5 = ctx.url.searchParams.get("md5") ?? '';
      if (!md5) {
        throw Error("invalid md5");
      }
      const db = Db.getInstance();
      await db.deleteFrom("apk_info").where("md5", "=", md5).execute();
      return Promise.resolve(
        new Response(JSON.stringify({ success: true, message: "ok" }), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    } catch (e) {
      return Promise.resolve(
        new Response(JSON.stringify({ success: false, message: e.message }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
          statusText: "Internal Server Error",
        }),
      );
    }
  },
};
