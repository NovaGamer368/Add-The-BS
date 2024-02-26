import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../Components/Movie";

const GenreList = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    console.log();
    fetch(`http://localhost:3306/MovieDB/Movies/${params.name}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setIsLoading(false);
        console.log("Testing to show more info: " + data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.name]);

  if (isLoading) {
    return <h1 className="text-xl text-center">LOADING...</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="p-20">
          <h2 className="font-bold flex">{params.name} movies available</h2>
          <hr className="w-80 h-2 rounded border-0 bg-gray-700" />
          <div className="overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            <ul className="container flex">
              {movieData.results?.map((movie) => (
                <li
                  key={movie.id}
                  className="p-9 cursor-pointer hover:scale-105 ease-in-out duration-300"
                >
                  <Movie movie={movie} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default GenreList;
