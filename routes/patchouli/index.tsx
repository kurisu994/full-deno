import { useSignal } from "@preact/signals";
import LemonDrop from "@/islands/LemonDrop.tsx";
import Search from "@/islands/Search.tsx";
import Info from "@/islands/Info.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ApkInfoRow, queryByKw } from "@/utils/apkquery.ts";

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
      <div class="mx-auto bg-green-500 h-svh min-w-[320px] flex">
        <div
          class="w-full min-w-[320px] flex justify-center items-center flex-col fixed z-10 pointer-events-none"
          aria-hidden="true"
        >
          <LemonDrop />
        </div>

        <div className="flex-1 flex flex-col max-w-screen-xl mx-auto">
          <div className="relative pt-[15vh]">
            <p class="text-3xl text-center mb-4">
              测试包查询
            </p>
            <Search value={kw} />
          </div>
          <div class="relative overflow-y-auto scroll-smooth snap-y scrollbar-hide flex flex-col flex-1 items-center mt-5 mb-[75px] mx-auto w-4/5 sm:w-4/6 md:w-1/2">
            {appList.value?.map((apk) => <Info key={apk.id} item={apk} />)}
          </div>
        </div>
      </div>
    </>
  );
}