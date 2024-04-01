import { Handlers } from "$fresh/server.ts";
import { ApkInfoRow, queryByKw } from "@/utils/apkdao.ts";

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
