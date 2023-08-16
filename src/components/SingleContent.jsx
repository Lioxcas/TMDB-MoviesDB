import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";

function SingleContent({
  id,
  poster_path,
  date,
  title,
  media_type,
  vote_average,
}) {
  const { auth } = useAuth();
  const { user, addFavorite, removeFavorite } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const isMovieFavorite = user.favorites.some((favorite) => {
      return favorite === id;
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
      axios.post(`https://node-tmdb-backy.onrender.com/api/favorites/${id}`, {
        username: auth.username,
      });
      addFavorite(id);
      setIsFavorited(!isFavorited);
    }
  };

  function oneDecimal(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,1})/;
    if (t.match(regex)[0] === 0) "N/A";
    if (t.match(regex)[0].length === 1) return t.match(regex)[0] + ".0";
    else return t.match(regex)[0];
  }

  return (
    <div className="flex flex-col min-w-max relative ">
      {/*  Si está en Fav y hay un user muestre el corazón lleno */}
      {auth.username && (
        <>
          {isFavorited ? (
            <button
              className="absolute mt-2 mr-2 right-0 bg-black/70 flex items-center p-1 rounded-md hover:before:content-['Remove_from_Favorites']"
              onClick={toggleFavorite}
            >
              <span
                className="material-symbols-outlined hover:animate-pulse hover:ease-in-out"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                favorite
              </span>
            </button>
          ) : (
            <button
              className="absolute mt-2 mr-2 right-0 bg-black/70 flex items-center p-1 rounded-md hover:before:content-['Add_to_Favorites']"
              onClick={toggleFavorite}
            >
              <span className="material-symbols-outlined hover:animate-pulse hover:ease-in-out">
                favorite
              </span>
            </button>
          )}
        </>
      )}
      {/*  Si no hay un user, que solo muestre las peliculas */}
      <Link to={`/${id}`}>
        <img
          className={`shadow-sm rounded-md`}
          className="w-[220px] h-[330px] shadow-sm rounded-md"
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
          alt={title}
        />
        <div className="absolute flex justify-center items-center bg-amber-500 rounded-full lg:w-8 lg:h-8 w-16 h-16 bottom-[-1.2rem] left-2">
          <div className="text-black font-bold text-lg lg:text-sm">
            {oneDecimal(vote_average)}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SingleContent;

