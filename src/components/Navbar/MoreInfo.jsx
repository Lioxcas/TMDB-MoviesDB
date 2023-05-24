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

  useEffect(() => {
    const isMovieFavorite = user.favorites.some((favorite) => {
      return favorite === parseInt(id);
    });
    setIsFavorited(isMovieFavorite);
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      axios.delete(`${process.env.URL}/api/favorites/${id}`, {
        data: {
          username: auth.username,
        },
      });
      removeFavorite(id);
      setIsFavorited(false);
    } else {
      axios.post(`${process.env.URL}/api/favorites/${id}`, {
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
    <div className="">
      <div
        className="mt-10 flex justify-start min-h-screen"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/original${backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img
          className="pt-20 ml-20 absolute"
          src={`https://www.themoviedb.org/t/p/w342${poster_path}`}
        ></img>
        <div className="bg-black/80 w-1/2 min-h-full mt-0 ml-auto mr-20 z-10 rounded-2xl flex flex-col justify-center">
          <span>
            <h1 className="text-5xl text-center">{title}</h1>
          </span>
          <h3 className="text-2xl text-center">
            {tagline}{" "}
            {auth.username && isFavorited && (
              <button className="absolute mt-2 mr-1" onClick={toggleFavorite}>
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
              <button className="absolute mt-2 mr-1" onClick={toggleFavorite}>
                <span className="material-symbols-outlined">favorite</span>
              </button>
            )}
          </h3>
          <p className="text-lg pt-5 text-justify pl-2 pr-2">{overview}</p>
        </div>
      </div>
      <Cast />
    </div>
  );
};
