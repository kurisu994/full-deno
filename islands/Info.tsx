import { IconDownload } from "@tabler/icons-preact";
import dayjs from "dayjs";
import { ApkInfoRow } from "@/utils/apkdao.ts";
import { Signal } from "@preact/signals";

interface InfoProps {
  datalist: Signal<ApkInfoRow[] | null>;
}

const Info = ({ datalist }: InfoProps) => {
  return (
    <div class="relative overflow-y-auto scroll-smooth snap-y scrollbar-hide flex flex-col flex-1 items-center mt-5 mb-[75px] mx-auto w-4/5 sm:w-4/6 md:w-1/2">
      {datalist.value?.map?.((item) => (
        <div class="snap-start select-none mb-6 shadow-md bg-neutral-200 border rounded-md border-transparent w-full p-4 duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none flex md:flex-row flex-col">
          <div class="w-full">
            <p class="font-bold text-lg">{`No.${item.id} ${item.appName}`}</p>
            <p class="text-base mt-2">大小：{item.appSize}</p>
            <p class="text-base mt-2">
              md5：<span class="font-mono select-text bg-blue-200 rounded py-px px-[5px]">
                {item.md5}
              </span>
            </p>
            <p class="text-base mt-2">
              发布时间：{dayjs(item.uploadAt).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
          <div class="flex items-center justify-end">
            <a href={item.downUrl} target="_blank" rel="noreferrer">
              <IconDownload
                stroke={2}
                size={32}
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
