import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "./Container/Banner";
import MovieList from "./MovieList";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topR, setTopR] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const trend = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
        );
        const topR = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
        );
        const upcom = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
        );

        setTrending(trend.data.results);
        setTopR(topR.data.results);
        setUpcoming(upcom.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  /*   {trending && trending[0] ? ( */
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
        <>
          <Banner
            imgID={trending[0].id}
            imgUrl={trending[0].poster_path}
            title={trending[0].title}
            description={trending[0].overview}
          />
          <div className="md:mt-4">
            <h3 className="text-xl pt-60 xl:pt-16 md:mb-2 leading-normal  ">
              Trending Movies
            </h3>
            {trending && <MovieList movies={trending} />}
          </div>

          <div className="">
            <h3 className="text-xl mb4 md:mb-2 leading-normal ">
              Top Rated Movies
            </h3>
            {topR && <MovieList movies={topR} />}
          </div>

          <div className="">
            <h3 className="text-xl mb-4 md:mb-2 leading-normal ">
              Upcoming Movies
            </h3>
            {upcoming && <MovieList movies={upcoming} />}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
