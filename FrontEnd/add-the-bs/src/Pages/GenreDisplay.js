import { React, useState, useEffect } from "react";
import Genre from "../Components/Genre";

const GenreDisplay = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3306/MovieDB/getGenreList`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="p-10">
          <h2 className="font-bold flex">Available Genres</h2>
          <hr className="w-64 h-2 rounded border-0 bg-gray-700" />
          <div className="overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            <ul className="container flex">
              {movieData.genres?.map((genres) => (
                <li
                  key={genres.id}
                  className="p-9 cursor-pointer hover:scale-105 ease-in-out duration-300"
                >
                  <Genre genres={genres} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default GenreDisplay;
