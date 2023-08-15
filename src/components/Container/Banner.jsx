import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = ({ imgUrl, title, description }) => {
  return (
    <>
      {resulta && (
        <div
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center `}
          style={{
            backgroundImage: `linear-gradient(30deg, rgba(0,0,0,1), rgba(0,0,0,0)),url(${`https://image.tmdb.org/t/p/original${resulta}`})`,
          }}
        ></div>
      )}

      <div className="flex w-full h-screen mb-[-8rem] md:mb-2 items-center text-center ">
        <div className="w-full md:w-2/5 h-auto items-center opacity-90">
          <Link to={`/${imgID}`}>
            <h2 className="pt-8 md:pt-2 text-5xl text-gray-200 leading-normal text-center ">
              {title}
            </h2>
          </Link>
          <p className="text-lg  md:text-xl">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Banner;
