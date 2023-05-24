import axios from "axios";
import React, { useEffect, useState } from "react";

const Banner = ({ imgID, imgUrl, title, description }) => {
  const [resulta, setResulta] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${imgID}/images`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS}`,
      },
    };
    const getBanner = async () => {
      const result = await axios
        .get(url, options)
        .then((response) => {
          setResulta(response.data.backdrops[0].file_path);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    getBanner();
  }, []);

  return (
    <>
      <div className="relative w-screen h-screen">
        {resulta && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center "
            style={{
              backgroundImage: `url(${`https://image.tmdb.org/t/p/original${resulta}`})`,
            }}
          ></div>
        )}

        <div className="flex w-full h-screen items-center text-start z-10 opacity-100 ">
          <div className=" w-2/5 h-auto items-center  bg-black opacity-70">
            <h2 className="text-5xl leading-normal text-center">{title}</h2>
            <p className="text-lg text-justify">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
