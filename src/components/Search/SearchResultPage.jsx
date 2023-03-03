import React from "react";
import { useLocation } from "react-router";
import SearchResults from "./SearchResults";

const SearchResultPage = () => {
  const location = useLocation();
  console.log("LOCATION", location);

  const searchQuery = location.state?.searchQuery || [];

  return (
    <div>
      <SearchResults data={searchQuery} />
    </div>
  );
};

export default SearchResultPage;
