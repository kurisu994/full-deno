import { Handlers } from "$fresh/server.ts";
import { Db } from "@/utils/db.ts";

export const handler: Handlers<string | null> = {
  async POST(_req, ctx) {
    try {
      const id = Number(ctx.url.searchParams.get("id") ?? 0);
      if (isNaN(id) || id <= 0) {
        throw Error("invalid id");
      }
      const db = Db.getInstance();
      await db.deleteFrom("apk_info").where("id", "=", id).execute();
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
