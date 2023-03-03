import React from "react";

const Banner = ({ imgUrl, title, description }) => {
  return (
    <>
      <div className="flex w-2/3 items-center text-start">
        <div className="w-2/3">
          <h2 className="text-5xl leading-normal text-center">{title}</h2>
          <p className="text-lg text-justify">{description}</p>
        </div>
      </div>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${imgUrl}`})`,
        }}
      ></div>
    </>
  );
};

export default Banner;
