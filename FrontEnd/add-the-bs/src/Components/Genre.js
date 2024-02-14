const Genre = ({genres}) => {
  return (
    <div className="p-4 w-96 h-fit border rounded-lg bg-gray-800 border-gray-700">
      <div className="flex justify-center items-center">
        <h1 className="h-32 flex justify-center items-center text-wrap font-bold text-white text-4xl">
          {genres.name}
        </h1>
      </div>
      <a href={`/GenreList/${genres.name}`} className="flex justify-center items-center mb-8 px-6 py-2 text-sm font-medium text-center text-white text-wrap rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"> 
        View {genres.name} Movies
        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </a>
    </div>
  )
}

export default Genre