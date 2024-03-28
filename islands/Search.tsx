import { useEffect, useState } from "preact/hooks";

interface Props {
  value?: string | null;
}

const Search = ({ value }: Props) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
  }, []);

  const search = () => {
    history.replaceState(null, "", `?kw=${query}`);
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
          placeholder="输入关键字"
          value={query ? query : ""}
          onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => handleKeyPress(e)}
          class="p-2 flex-1  border-2 border-yellow-300 rounded-md text-lg text-center duration-300 focus:outline-none focus:border-yellow-400"
        />
        <button
          onClick={search}
          className="custom-btn kbtn ml-4"
        >
          <span>搜索</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
