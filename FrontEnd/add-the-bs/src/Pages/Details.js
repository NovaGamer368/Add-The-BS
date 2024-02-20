import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { red } from "tailwindcss/colors";

const Details = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    console.log();
    fetch(`http://localhost:3001/MovieDB/MovieId/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setIsLoading(false);
        console.log("Testing to show more info: " + data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  useEffect(() => {
    fetchPoster(movieData.backdrop_path || movieData.poster_path).then((data) => {
      setIsLoading(false);
      setPosterUrl(data);
      //console.log(posterUrl);
    });
  }, [movieData.backdrop_path, movieData.poster_path]);

  const fetchPoster = async (backdropUrl, posterUrl) => {
    try {
      let url;
      if(backdropUrl) {
        url = `http://localhost:3001/MovieDB/Poster${backdropUrl}`;
      } else if (posterUrl) {
        url =  `https://localhost:3001/MovieDB/Poster${posterUrl}`;
      } else {
        return "";
      }
      const response = await fetch(url);
      const data = await response.json();
      //console.log("movie image url is: ", data);
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (isLoading) {
    return <h1 className="text-xl text-center">LOADING...</h1>;
  }

  if (Object.keys(movieData).length > 0) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "#282c34", minHeight: "100vh", padding: "20px" }}>
      <div style={{ flex: "0 0 auto", marginRight: "20px" }}>
    <div className="col-md-4">
      <img src={posterUrl} className="img-fluid rounded-start" alt="productImg"/>
    </div> 
        <div style={{ marginTop: "10px", color: "white" }}>
          <p>Rating: {movieData.rating}</p>
          {/* Add more rating details if needed */}
        </div>
      </div>
      <div style={{ flex: "1 1 auto", color: "white" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{movieData.title}</h2>
        <p style={{ fontSize: "16px" }}>{movieData.overview}</p>
        <br></br>
        <p style={{ fontSize: "16px" }}>Actors: </p>
        <p style={{ fontSize: "16px" }}>More Like This: </p>

        Reviews: 


        {/* Add more movie details if needed */}
      

  <br>
  </br>
  <li></li>

      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-white-900">
        Add your comment
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={''}
          
        />
        <button style={{backgroundColor: "red", border: "rounded"}}>Leave review</button>
      </div>
</div>



    </div>
  ); 
};
}
 
export default Details;
