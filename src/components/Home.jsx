import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import SingleContent from "./SingleContent";

const Home = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`
        )
        .then(({ data }) => setTrending(data.results))
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  return (
    <div className="container">
      {trending &&
        trending.map(
          ({
            id,
            poster_path,
            title,
            name,
            first_air_date,
            release_date,
            media_type,
            vote_average,
          }) => (
            <SingleContent
              key={id}
              id={id}
              poster={poster_path}
              title={title || name}
              date={first_air_date || release_date}
              media_type={media_type}
              vote_average={vote_average}
            />
          )
        )}
    </div>
  );
};

export default Home;
