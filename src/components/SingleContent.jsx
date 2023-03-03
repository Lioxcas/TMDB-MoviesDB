import axios from "axios";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
/* import Favorite from "../assets/Favorite.png"; */

function SingleContent({
  id,
  poster_path,
  date,
  title,
  media_type,
  vote_average,
}) {
  const { auth } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  const setFav = () => {
    axios.post(`http://localhost:3001/api/favorites/${id}`, {
      username: auth.username,
    });
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex flex-col min-w-max relative ">
      {auth.username && isFavorited ? (
        <button className="absolute mt-2 mr-1 right-0">
          <span className=""></span>
          {/*  <img src={favorite} /> */}
        </button>
      ) : (
        <button className="absolute mt-2 mr-1 right-0" onClick={setFav}>
          <span className="material-symbols-outlined">favorite</span>
          {/*  <img src={favorite} /> */}
        </button>
      )}
      <Link to={`/${id}`}>
        <img
          className="w-[150px] h-[225px] shadow-sm rounded-md"
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
          alt={title}
        />
      </Link>
    </div>
  );
}

export default SingleContent;
