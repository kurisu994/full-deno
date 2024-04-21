import { useSignal } from "@preact/signals";
import WaterDrop from "@/islands/WaterDrop.tsx";
import Search from "@/islands/Search.tsx";
import Info from "@/islands/Info.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ApkInfoRow, queryByKw } from "@/utils/apkdao.ts";

export const handler: Handlers<ApkInfoRow[] | null> = {
  async GET(_, ctx) {
    const kw = ctx.url.searchParams.get("kw") ?? "";
    const list = await queryByKw(kw);
    return ctx.render(list);
  },
};

export default function Home(
  { data, url }: PageProps<ApkInfoRow[] | null>,
) {
  const kw = url.searchParams.get("kw");
  const appList = useSignal(data);

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="/styles/kbtn-style.css" />
      </head>
      <div class="dark:brightness-50 bg-[url('/img/steins_gate.png')] bg-cover h-screen h-svh min-w-[320px] flex">
        <div
          class="w-full min-w-[320px] flex justify-center items-center flex-col fixed z-10 pointer-events-none"
          aria-hidden="true"
        >
          <WaterDrop />
        </div>

        <div className="flex-1 flex flex-col max-w-screen-xl mx-auto">
          <div className="relative pt-[15vh] text-center">
            <img
              class="inline-block mr-4"
              alt="logo"
              src="/img/patchouli.gif"
            />
            <span class="text-3xl text-center mb-4 font-serif">
              不动的大图书馆
            </span>
            <Search value={kw} datalist={appList} />
          </div>
          <Info datalist={appList} />
        </div>
      </div>
    </>
  );
}
