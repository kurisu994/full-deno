import { Handlers } from "$fresh/server.ts";
import { IApk, saveData } from "@/utils/apkdao.ts";

export const handler: Handlers<string | null> = {
  async POST(req, _ctx) {
    try {
      const data: IApk = await req.json();
      validateParams(data);
      const res = await saveData(data);
      return Promise.resolve(
        new Response(JSON.stringify({ success: true, data: res }), {
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

function validateParams(data: IApk) {
  if (!data.appName) {
    throw new Error("appName is required");
  }
  if (!data.appSize) {
    throw new Error("appSize is required");
  }
  if (!data.md5) {
    throw new Error("md5 is required");
  }
  if (!data.fid) {
    throw new Error("fid is required");
  }
}
