import { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import Movie from "./Components/Movie";

function App() {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/MovieDB/getMovies/1`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [movieData2, setMovieData2] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/MovieDB/trending`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData2(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container max-w-full max-h-48 flex justify-center bg-gray-500">
          <img src={logo} className="App-logo max-h-52" alt="logo" />
        </div>
        {/* display data below */}
        <div className="p-20">
          <h2 className="font-bold flex">Now Playing Movies</h2>
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
        <div>
          <h2 className="font-bold flex">Trending</h2>
          <hr className="w-40 h-2 rounded border-0 bg-gray-700" />
          <div className="overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            <ul className="container flex">
              {movieData2.results?.map((movie) => (
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
}

export default App;
