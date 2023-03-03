import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ data }) => {
  console.log("mucha data", data);

  return (
    <div className="grid grid-cols-4 mx-auto mt-36 gap-4">
      {data &&
        data.map(({ poster_path, id, media_type }) => {
          {
            if (media_type !== "person")
              return (
                <Link to={`/${id}`}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
                  />
                </Link>
              );
          }
        })}
    </div>
  );
};

export default SearchResults;
