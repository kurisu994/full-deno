import { Handlers } from "$fresh/server.ts";
import { queryByKw, ApkInfoRow } from "@/utils/apkquery.ts";

export const handler: Handlers<ApkInfoRow[] | null> = {
  async GET(_req, ctx) {
    const kw = ctx.params.kw;
    const list = await queryByKw(kw);
    return Promise.resolve(
      new Response(JSON.stringify(list), {
        headers: { "Content-Type": "application/json" },
      }),
    );
  },
};