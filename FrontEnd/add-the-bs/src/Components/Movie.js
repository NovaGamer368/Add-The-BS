import React, { useEffect, useState } from "react";

const Movie = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");
  const [genreData, setGenreData] = useState({});

  useEffect(() => {
    fetchPoster(movie.poster_path).then((data) => {
      setIsLoading(false);
      setPosterUrl(data);
      //console.log(posterUrl);
    });
  }, [movie.poster_path, posterUrl]);

  useEffect(() => {
    fetch(`http://localhost:3001/MovieDB/getGenreList`)
      .then((response) => response.json())
      .then((data) => {
        const genres = {};
        data.genres.forEach((genre) => {
          genres[genre.id] = genre.name;
        });
        setGenreData(genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchPoster = async (posterUrl) => {
    try {
      const response = await fetch(
        `http://localhost:3001/MovieDB/Poster${posterUrl}`
      );
      const data = await response.json();
      //console.log("movie image url is: ", data);
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getGenreName = (id) => {
    return genreData[id] || "Unknown";
  }

  function formatDate(dateString){
    const date = new Date(dateString);
    const month = date.getMonth() +1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`
  };

  if (isLoading) {
    return <p>LOADING...</p>;
  }
  return (
    <div className="p-4 w-96 h-fit border rounded-lg bg-gray-800 border-gray-700">
      <div>
        <p className="mb-14">
          <img src={posterUrl} alt="poster" />
        </p>
      </div>
      <div className="mb-14 flex justify-center items-center">
        <h1 className="h-12 flex justify-center items-center text-wrap font-bold text-white">
          {movie.title}
        </h1>
      </div>
      <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-4" />
      <div>
        <h4 className="text-white text-2xl flex">Release Date: </h4>
        <p className="text-3xl flex justify-center">{formatDate(movie.release_date)}</p>
      </div>
      <div>
        <h4 className="text-white text-2xl flex">Genre: </h4>
        <ul>
          {movie.genre_ids.map((id) => (
            <li key={id} className="flex justify-center">
            {getGenreName(id)}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={`/MovieInfo/${movie.id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default Movie;
