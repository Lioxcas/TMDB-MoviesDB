import React from "react";
import SingleContent from "./SingleContent";

const MovieList = ({ movies }) => {
  console.log("MOVIES", movies);
  return (
    <div className="flex pt-2 pb-5 px-5 overflow-x-auto ">
      {movies &&
        movies.map((movie, id) => {
          return <SingleContent key={id} {...movie} />;
        })}
    </div>
  );
};

export default MovieList;
