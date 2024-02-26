import {React, useEffect, useState} from 'react';
import Movie from '../Components/Movie';

const MovieSearch = () => {
  const [movieData, setMovieData] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(movieSearch.trim() === ''){
            setMovieData([]);
            return;
        }
        setIsLoading(true);
        fetch(`http://localhost:3001/MovieDB/MovieName/${movieSearch}`)
            .then(response => response.json())
            .then(data => {
                setMovieData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(true);
            });
    }, [movieSearch]);
    
    return (
        <>
            <div>
                <div className='container max-w-full max-h-48 flex justify-center bg-slate-800'>
                    <form onSubmit={e => e.preventDefault()} className='container max-h-48 flex justify-center items-center h-screen py-6 px-10 max-w-full overflow-y-auto'>
                        <div className='w-3/4'>
                            <div className='relative'>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </div>
                                <input type="text" id="default-search" className="block w-full h-18 p-4 pl-14 text-2xl border rounded-3xl bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Movie title..." value={movieSearch} onChange={e => setMovieSearch(e.target.value)}/>
                            </div>
                        </div>
                    </form>
                </div>
                <header className="App-header">
                {!isLoading && movieData.length > 0 && (
                    <div className="p-20">
                        <h2 className="font-bold flex">Now Playing Movies</h2>
                        <hr className="w-80 h-2 rounded border-0 bg-gray-700" />
                        <div className="overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
                            <ul className="container flex">
                            {movieData.filter(movie => movie.poster_path !== null).map(movie => (
                                <li key={movie.id} className='p-9 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                                    <Movie movie={movie}/>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                )}
                </header>
            </div>
        </>
    )
}
