import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";
import { ApkInfoRow } from "@/utils/apkdao.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface Props {
  value?: string | null;
  datalist: Signal<ApkInfoRow[] | null>;
}

const Search = ({ value, datalist }: Props) => {
  const [query, setQuery] = useState(value);

  async function handleSearch(kw: string) {
    try {
      const res = await fetch(`/api/apk/${kw}`);
      const data: ApkInfoRow[] = await res.json();
      datalist.value = data;
    } catch (e) {
      alert(`错误：${e.message}`);
    }
  }

  const search = () => {
    if (query) {
      history.replaceState(null, "", `?kw=${query}`);
      handleSearch(query);
    } else {
      location.replace("/");
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div class="flex flex-col items-center justify-start w-4/5 md:w-1/2  mx-auto">
      <div class="flex items-center w-full mt-4">
        <input
          type="text"
          placeholder="输入打包日期 e.g: mmddHHmm"
          value={query ? query : ""}
          onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => handleKeyPress(e)}
          class="p-2 flex-1  border-2 border-yellow-300 rounded-md text-lg text-center duration-300 focus:outline-none focus:border-yellow-400"
        />
        <button
          onClick={search}
          className="custom-btn kbtn ml-4"
          disabled={!IS_BROWSER}
        >
          <span>搜索</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
