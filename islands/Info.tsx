import { useEffect, useState } from "preact/hooks";
import { IconDownload } from "@tabler/icons-preact";
import dayjs from "dayjs";


interface InfoProps {
  name: string;
}

const Info = ({ name }: InfoProps) => {
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(name)!);
    if (stored === null) setBookmarked(false);
    else setBookmarked(stored);
  }, []);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    localStorage.setItem(name, JSON.stringify(!bookmarked));
  };

  return (
    <div class="select-none mb-6 shadow-md bg-neutral-200 border rounded-md border-transparent w-full p-4 duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none flex md:flex-row flex-col">
      <div class="w-full">
        <p class="font-bold text-lg">{name}</p>
        <p class="text-base mt-2">大小：147MB</p>
        <p class="text-base mt-2">
          md5：<span class="font-mono select-text bg-blue-200 rounded py-px px-[5px]">
            xsadadadasd
          </span>
        </p>
        <p class="text-base mt-2">
          发布时间：{dayjs("2024-03-28 00:11:12").fromNow()}
        </p>
      </div>
      <div class="flex items-center justify-end">
        <IconDownload
          stroke={2}
          size={32}
          className="cursor-pointer"
          onClick={() => console.info("xx")}
        />
      </div>
    </div>
  );
};

export default Info;
