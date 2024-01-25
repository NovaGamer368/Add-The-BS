import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:3001/MovieDB/getMovies/1`)
      .then(response => response.json())
      .then(data => {
          setMovieData(data);
          console.log("Data: ", data)
      })
      .catch(error => {
          console.error(error);
      })
    }, []);

  const [movieData2, setMovieData2] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:3001/MovieDB/trending`)
      .then(response => response.json())
      .then(data => {
          setMovieData2(data);
          console.log("Data: ", data)
      })
      .catch(error => {
          console.error(error);
      })
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className='container max-w-full max-h-48 flex justify-center bg-gray-500'>
          <img src={logo} className="App-logo max-h-52" alt="logo" />
        </div>
        {/* display data below */}
        <div className='p-20'>
          <h2 className='font-bold flex'>Now Playing Movies</h2>
          <hr className="w-80 h-2 rounded border-0 bg-gray-700"/>
          <div className='overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
            <ul className='container flex'>
              {movieData.results?.map((movie) => (
              <li key={movie.id} className='p-9 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <div className="p-6 w-96 h-fit border rounded-lg bg-gray-800 border-gray-700">
                  <div>
                    <h1 className="mb-10 p-2 h-20 flex justify-center items-center text-wrap font-bold text-white">{movie.title}</h1>
                    <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-4 bg-gray-700"/>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <img src='https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' alt='poster'/>
                    </p>
                  </div>
                  <div>
                    <h2 className="text-white text-2xl flex">Release Date: </h2>
                    <p className='text-2xl'>{movie.release_date}</p>
                  </div>
                  {/* <div>
                    <ul>
                      <li key={movie.id}>{movie.genre_ids.filter(genre_ids => genre_ids !== "").join(" , ")}</li>
                    </ul>
                  </div> */}
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                  </div>
              </li>))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className='font-bold flex'>Trending</h2>
          <hr className="w-40 h-2 rounded border-0 bg-gray-700"/>
          <div className='overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
            <ul className='container flex'>
              {movieData2.results?.map((movie) => (
              <li key={movie.id} className='p-9 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <div className="p-6 w-96 h-fit border rounded-lg bg-gray-800 border-gray-700">
                  <div>
                    <h1 className="mb-10 p-2 h-20 flex justify-center items-center text-wrap font-bold text-white">{movie.title}</h1>
                    <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-4 bg-gray-700"/>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <img src='https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' alt='poster'/>
                    </p>
                  </div>
                  <div>
                    <h2 className="text-white text-2xl flex">Release Date: </h2>
                    <p className='text-2xl'>{movie.release_date}</p>
                  </div>
                  {/* <div>
                    <ul>
                      <li key={movie.id}>{movie.genre_ids.filter(genre_ids => genre_ids !== "").join(" , ")}</li>
                    </ul>
                  </div> */}
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                  </div>
              </li>))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
