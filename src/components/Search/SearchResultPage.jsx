import React from "react";
import { useLocation } from "react-router";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

const SearchResultPage = () => {
  const location = useLocation();

  const searchQuery = location.state?.searchQuery || [];

  return (
    <div>
      <SearchBar />
      <SearchResults data={searchQuery} />
    </div>
  );
};

export default SearchResultPage;
