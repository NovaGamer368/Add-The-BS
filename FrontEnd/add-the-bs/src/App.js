import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';



function App() {
  const [movieData, setMovieData] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:3000/MovieDB/getMovies/1`)
      .then(response => response.json())
      .then(data => {
          setMovieData(data);
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
        <div>
        <h2>Now Playing Movies</h2>
          <ul>
            {movieData.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
