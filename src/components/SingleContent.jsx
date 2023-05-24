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
      axios.delete(`https://bespoke-truffle-3baa6f.netlify.app/api/favorites/${id}`, {
        data: {
          username: auth.username,
        },
      });
      removeFavorite(id);
      setIsFavorited(false);
    } else {
      axios.post(`https://bespoke-truffle-3baa6f.netlify.app/api/favorites/${id}`, {
        username: auth.username,
      });
      addFavorite(id);
      setIsFavorited(!isFavorited);
    }
  };

  return (
    <div className="flex flex-col min-w-max relative ">
      {/*  Si está en Fav y hay un user muestre el corazón lleno */}
      {auth.username && isFavorited && (
        <button className="absolute mt-2 mr-1 right-0" onClick={toggleFavorite}>
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
      {/*  Si no esta en Fav y hay un user muestre el corazón vacío */}
      {auth.username && (
        <button className="absolute mt-2 mr-1 right-0" onClick={toggleFavorite}>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      )}
      {/*  Si no hay un user, que solo muestre las peliculas */}
      <Link to={`/${id}`}>
        <img
          className="w-[220px] h-[330px] shadow-sm rounded-md"
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
          alt={title}
        />
      </Link>
    </div>
  );
}

export default SingleContent;
