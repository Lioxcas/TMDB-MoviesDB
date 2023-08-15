import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../axios";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import Cast from "../Cast";

export const MoreInfo = () => {
  const id = useParams().id;
  const [getInfo, setGetInfo] = useState({});
  const { auth } = useAuth();
  const { user, addFavorite, removeFavorite } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const isMovieFavorite = user.favorites.some((favorite) => {
      return favorite === parseInt(id);
    });
    setIsFavorited(isMovieFavorite);
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      axios.delete(`https://node-tmdb-backy.onrender.com/api/favorites/${id}`, {
        data: {
          username: auth.username,
        },
      });
      removeFavorite(id);
      setIsFavorited(false);
    } else {
      axios.post(`https://node-tmdb-backy.onrender.comapi/favorites/${id}`, {
        username: auth.username,
      });
      addFavorite(id);
      setIsFavorited(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
          );
          setGetInfo(res.data);
          window.scrollTo(0, 0);
          setTimeout(() => {
            setisLoading(false);
          }, 750);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const {
    title,
    overview,
    genres,
    vote_average,
    tagline,
    poster_path,
    backdrop_path,
  } = getInfo;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="">
          <div
            className="absolute top-0 left-0 bg-fixed md:flex justify-start min-h-screen w-full "
            style={{
              backgroundImage: `linear-gradient(30deg, rgba(0,0,0,1), rgba(0,0,0,0)),url(https://www.themoviedb.org/t/p/original${backdrop_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full justify-center relative">
                <img
                  className="pt-0  mx-auto scale-75 md:scale-100 md:pt-32"
                  src={`https://www.themoviedb.org/t/p/w342${poster_path}`}
                ></img>
              </div>
              <div className="relative lg:w-1/2 min-h-[400px] mt-0 ml-auto flex flex-col justify-center">
                {auth.username && isFavorited && (
                  <button
                    className="absolute right-0 bottom-0 mb-2 md:mb-36 pr-8 "
                    onClick={toggleFavorite}
                  >
                    Remove from Favorites
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      favorite
                    </span>
                  </button>
                )}
                {auth.username && !isFavorited && (
                  <button
                    className="absolute right-0 bottom-0  mb-2 lg:mb-36 pr-8"
                    onClick={toggleFavorite}
                  >
                    <>Add to Favorites</>{" "}
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                )}
                <div className="lg:pr-10 pr-4 pl-4 bg-black/50 md:bg-transparent">
                  <span className="">
                    <h1 className="text-2xl md:text-5xl lg:text-2xl lg:pt-20 text-center">
                      {title}
                    </h1>
                  </span>
                  <h3 className="text-lg md:text-2xl lg:text-xl text-center">
                    {tagline}
                  </h3>
                  <p className="text-sm text-center md:text-lg  lg:text-sm pt-2 md:pt-5 pl-2 pr-2">
                    {overview}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Cast />
        </div>
      )}
    </>
  );
};

/* className="mt-10 flex justify-start min-h-screen" */
