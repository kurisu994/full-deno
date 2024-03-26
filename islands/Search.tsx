import { useEffect, useState } from "preact/hooks";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([
    "What are you waiting for? Search now 🦕",
  ]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [pressToggle, setPressToggle] = useState(false);

  useEffect(() => {
    getBookmarked();
    getSuggested();
  }, []);

  useEffect(() => {
    search(query);
  }, [pressToggle]);

  const getBookmarked = () => {
    // let tempBookmarked = [];
    // for (let i = 0; i < DINOLIST.length; i++) {
    //   const name = DINOLIST[i][0].charAt(0).toUpperCase() +
    //     DINOLIST[i][0].slice(1);
    //   const stored = JSON.parse(localStorage.getItem(name)!);
    //   if (stored === true) tempBookmarked.push(name);
    // }
    // setBookmarked(tempBookmarked);
  };

  const getSuggested = () => {
    // let tempSuggested = [];
    // for (let i = 0; i < 5; i++) {
    //   const index = Math.floor(Math.random() * DINOLIST.length);
    //   const name = DINOLIST[index][0].charAt(0).toUpperCase() +
    //     DINOLIST[index][0].slice(1);
    //   tempSuggested.push(name);
    // }
    // setSuggested(tempSuggested);
  };

  const search = (query: string) => {
    // let tempResult = [];
    // const queryLength = query.length;

    // for (let i = 0; i < DINOLIST.length; i++) {
    //   const name = DINOLIST[i][0].toLowerCase();
    //   const location = DINOLIST[i][3].toLowerCase();
    //   if (query) {
    //     if (
    //       name.slice(0, queryLength).includes(query.toLowerCase()) ||
    //       location.slice(0, queryLength).includes(query.toLowerCase())
    //     ) {
    //       tempResult.push(name.charAt(0).toUpperCase() + name.slice(1));
    //     }
    //   }
    // }
    // if (tempResult.length > 0) setResult(tempResult);
    // else setResult(["No dinosaurs found!"]);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setPressToggle(!pressToggle);
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
          onClick={() => setPressToggle(!pressToggle)}
          className="custom-btn kbtn ml-4"
        >
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
