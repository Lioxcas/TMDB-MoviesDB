import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../axios";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
        );
        setCast(res.data.cast);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="mt-[750px] md:mt-[1200px] lg:mt-[800px] xl:mt-[700px] ">
      <h3 className="text-2xl pt-4 pb-2 underline">Cast</h3>
      <div className="flex gap-4 overflow-x-auto">
        {cast &&
          cast.map(({ character, name, profile_path }) => {
            return (
              <div className="flex-shrink-0">
                {profile_path && (
                  <>
                    <img
                      src={`https://www.themoviedb.org/t/p/w185${profile_path}`}
                    />
                    <h4 className="font-semibold pt-1">{name}</h4>
                    <h5>{character}</h5>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cast;
