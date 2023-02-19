import React from "react";

const SingleContent = ({
  id,
  poster,
  date,
  title,
  media_type,
  vote_average,
}) => {
  return (
    <div className="card">
      <img
        className="poster"
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster}`}
        alt={title}
      />
    </div>
  );
};

export default SingleContent;
