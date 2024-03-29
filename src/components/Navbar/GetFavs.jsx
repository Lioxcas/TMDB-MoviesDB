import React, { useEffect, useState } from "react";
import axios from "../../axios";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { Link, NavLink, useNavigate } from "react-router-dom";

const GetFavs = () => {
  const [favs, setFavs] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user, removeFavorite } = useUser();
  const username = auth.username;

  const favorites = async () => {
    const res = await axios.get(
      `https://node-tmdb-backy.onrender.com/api/favorites/${username}`
    );
    setFavs(res.data);
  };

  useEffect(() => {
    favorites();
  }, []);

  const deleteFav = async (id) => {
    try {
      removeFavorite(id);
      await axios.delete(
        `https://node-tmdb-backy.onrender.com/api/favorites/${id}`,
        {
          data: {
            username: username,
          },
        }
      );
      setTimeout(() => {
        favorites();
      }, 350);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex overflow-x-auto mt-16">
      {favs.map(({ id, poster_path, title }) => (
        <div className="relative flex-shrink-0" key={id}>
          <button
            className="absolute mt-4 right-0 bg-black rounded hover:bg-red-600"
            onClick={() => {
              deleteFav(id);
            }}
          >
            Eliminar
          </button>
          <Link to={`/${id}`}>
            <img
              className="poster  w-full h-full"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
              alt={title}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GetFavs;
