import {useEffect, useState} from 'react'

const Actor = ({actor}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posterUrl, setPoserUrl] = useState("");

    useEffect(() => {
        fetchPoster(actor.profile_path).then((data) => {
            setIsLoading(false);
            setPoserUrl(data);
            //console.log(posterUrl);
        });
    }, [actor.profile_path, posterUrl]);

    const fetchPoster = async (posterUrl) => {
        try {
            const response = await fetch(
                `http://localhost:3001/MovieDB/Poster${posterUrl}`
            );
            const data = await response.json();
            //console.log("actor image url is: ", data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };

    if(isLoading){
        return <p>LOADING...</p>
    }
    return (
        <div className="p-4 w-96 h-fit border rounded-lg bg-gray-800 border-gray-700">
            <div>
                <p className="mb-6">
                    <img src={posterUrl} alt="poster" />
                </p>
            </div>
            <div className="mb-6 flex justify-center items-center">
                <h1 className="h-12 flex justify-center items-center text-wrap font-bold text-white text-4xl">
                    {actor.name}
                </h1>
            </div>
            <hr className="mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-4" />
            <div>
                <h4 className="mb-2 flex text-white text-3xl font-bold">Know For: </h4>
                <p className="mb-4 text-5xl flex justify-center">
                    {actor.known_for_department}
                </p>
            </div>
            <div>
                <h4 className="mb-2 flex text-white text-3xl font-bold">Roles: </h4>
                <ul className='mb-10'>
                    <li key={actor.id} className="flex justify-center text-wrap">
                        {actor.known_for.map((detail) => detail.title).join(" | ")}
                    </li>
                </ul>
            </div>
            <a href={`/MovieInfo/${actor.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-500 hover:bg-blue-700 focus:ring-blue-800">
                Read more 
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
            </a>
        </div>
    )
}

export default Actor