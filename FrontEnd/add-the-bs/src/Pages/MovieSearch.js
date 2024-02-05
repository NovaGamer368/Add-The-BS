import {React, useState} from 'react';
import Movie from '../Components/Movie';

const MovieSearch = () => {
    const [movieData, setMovieData] = useState([]);
    const[movieSearch, setMovieSearch] = useState('');

    function create(event){
        event.preventDefault();
        fetch(`http://localhost:3001/MovieDB/MovieName/${movieSearch}`)
        .then(response => response.json())
        .then(data => {
            setMovieData(data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    if(movieData){return (
        <>
        <div>
            <header className="App-header">
                <div className='container max-w-full max-h-48 flex justify-center bg-gray-500'>
                    <form onSubmit={create} className='container max-h-48 flex justify-center items-center h-screen py-6 px-10 max-w-full overflow-y-auto'>
                        <div className='w-3/4'>
                            <div className='relative'>
                                <label htmlFor="default-search" className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"> Search </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-m text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required value={movieSearch} onChange={e => setMovieSearch(e.target.value)}/>
                                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Search </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-20">
                    <h2 className="font-bold flex">Now Playing Movies</h2>
                    <hr className="w-80 h-2 rounded border-0 bg-gray-700" />
                    <div className="overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
                        <ul className="container flex">
                            {movieData?.map((movie) => (
                            <li key={movie.id} className="p-9 cursor-pointer hover:scale-105 ease-in-out duration-300">
                                <Movie movie={movie} />
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>
        </div>
        </>
    )}
    else{
        <>
        <div>
            <header className="App-header">
                <div className='container max-w-full max-h-48 flex justify-center bg-gray-500'>
                    <form onSubmit={create} className='container max-h-48 flex justify-center items-center h-screen py-6 px-10 max-w-full overflow-y-auto'>
                        <div className='w-3/4'>
                            <div className='relative'>
                                <label htmlFor="default-search" className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"> Search </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-m text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required value={movieSearch} onChange={e => setMovieSearch(e.target.value)}/>
                                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Search </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </header>
        </div>
        </>
    }
}

export default MovieSearch