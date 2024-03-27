import { useSignal } from "@preact/signals";
import LemonDrop from "@/islands/LemonDrop.tsx";
import Search from "@/islands/Search.tsx";
import Info from "@/islands/Info.tsx";

export default function Home() {
  const result = useSignal([
    "v2.302",
    "v2.3021",
    "v2.3022",
    "v2.3023",
    "v2.3024",
    "v2.3025",
    "v2.3026",
    "v2.3027",
    "v2.3028",
    "v2.3029",
    "v2.30200",
    "v2.30211",
  ]);
  const count = useSignal(0);
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="styles/kbtn-style.css" />
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
            <Search />
          </div>
          <div class="relative overflow-y-scroll flex flex-col flex-1 items-center mt-5 mb-[75px] mx-auto w-4/5 sm:w-4/6 md:w-1/2">
            {result.value.map((name) => <Info key={name} name={name} />)}
          </div>
        </div>
      </div>
    </>
  );
}
