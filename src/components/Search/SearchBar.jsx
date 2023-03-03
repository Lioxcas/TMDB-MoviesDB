import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../axios";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      console.log("HOLA");
      console.log("esta es la query", input);
      const result = await axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&&query=${input}&page=1&include_adult=false`
        )
        .then((result) => setSearchQuery(result.data.results));
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate(`/search/${input}`, { state: { searchQuery } });
    }
  }, [searchQuery]);

  const handleInput = async (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex-grow justify-center left-1/2 right-1/2 lg:flex lg:items-center lg:w-auto">
      <div className="relative w-full max-w-md lg:max-w-2xl mx-auto text-white text-3xl lg:block hidden">
        <input
          type="search"
          name="search"
          onChange={handleInput}
          onKeyDown={(e) => handleSearch(e)}
          className="border-2 w-full max-w-md lg:max-w-2xl mx-auto border-gray-300 bg-transparent h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Search movie or tv.."
        />
      </div>
    </div>
  );
};

export default SearchBar;
