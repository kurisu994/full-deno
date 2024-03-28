import { IconDownload } from "@tabler/icons-preact";
import dayjs from "dayjs";
import { ApkInfoRow } from "@/utils/apkquery.ts";

interface InfoProps {
  item: ApkInfoRow;
}

const Info = ({ item }: InfoProps) => {
  return (
    <div class="snap-start select-none mb-6 shadow-md bg-neutral-200 border rounded-md border-transparent w-full p-4 duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none flex md:flex-row flex-col">
      <div class="w-full">
        <p class="font-bold text-lg">{item.appName}</p>
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
        <a>
          <IconDownload
            stroke={2}
            size={32}
          />
        </a>
      </div>
    </div>
  );
};

export default Info;
