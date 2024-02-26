import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { red } from "tailwindcss/colors";
import { FaStar } from "react-icons/fa";

const Details = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");
  const [comment, setComment] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [showReviewSection, setShowReviewSection] = useState(false); // State to track whether to show the review section
  const maxCharacters = 120;

  console.log(movieData.rating / 2)


  useEffect(() => {
    fetch(`http://localhost:3001/MovieDB/MovieId/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  useEffect(() => {
    fetchPoster(movieData.backdrop_path || movieData.poster_path).then((data) => {
      setIsLoading(false);
      setPosterUrl(data);
    });
  }, [movieData.backdrop_path, movieData.poster_path]);

  const fetchPoster = async (backdropUrl, posterUrl) => {
    try {
      let url;
      if (backdropUrl) {
        url = `http://localhost:3001/MovieDB/Poster${backdropUrl}`;
      } else if (posterUrl) {
        url = `https://localhost:3001/MovieDB/Poster${posterUrl}`;
      } else {
        return "";
      }
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCommentChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxCharacters) {
      setComment(text);
    }
  };


  function Star({ selected = false, onSelect }) {
    return <FaStar color={selected ? "yellow" : "white"} onClick={onSelect} />;
  }



  function StarRating({totalStars = 5}) {
    return(
      <>
      {[...Array(totalStars)].map((_, i) => (
        <Star key={i} selected={selectedStars > i} onSelect={() => setSelectedStars(i + 1)}/>
      ))}
      </>
    )  
  }



  function StarRate({ movieData }) {
    const totalStars = 5;
    const scaledRating = Math.min(5, Math.max(0, movieData.rating / 2)); 
    const fullStars = Math.round(scaledRating); // Round the rating to the nearest number
  
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="yellow" />);
    }
  
    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<FaStar key={i} color="gray" />);
    }
  
    return (
      <div>
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  }

  const handleLeaveReviewClick = () => {
    setShowReviewSection((prev) => !prev);
  };

  if (isLoading) {
    return <h1 className="text-xl text-center">LOADING...</h1>;
  }

  if (Object.keys(movieData).length > 0) {

   
    return (
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "#282c34", minHeight: "100vh", padding: "20px",}}>
        <div style={{ flex: "0 0 auto", marginRight: "20px" }}>
          <div className="col-md-4">
            <img src={posterUrl} className="img-fluid rounded-start" alt="productImg"/>
          </div>
          <div style={{ marginTop: "10px", color: "white", }} >
            <div className="flex flex-row">
              <p>Rating: {movieData.rating / 2}: </p>
            <StarRate movieData={movieData} />
            </div>
            
            <p style={{ fontSize: "20px" }}>Runtime: {movieData.runtime}</p>
            <p style={{ fontSize: "20px" }}>Released: {movieData.release_date}</p>
            <button onClick={handleLeaveReviewClick} style={{ backgroundColor: "Blue", border: "rounded" }} className="rounded-lg h-10 w-32">
            {showReviewSection ? "Cancel" : "Leave a Review"}
          </button>
          {showReviewSection && (
            <div>
              <h1 className="mb-4">Leave your review:</h1>
              <div className="flex mb-4">
                <StarRating />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium leading-6 text-white-900" >
                  Add your comment
                </label>
                <div className="mt-2">
                  <textarea rows={4} name="comment" id="comment" className="block p-2 text-lg w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 " value={comment} onChange={handleCommentChange}/>
                  <p className="flex pl-96">
                    {comment.length}/{maxCharacters} characters
                  </p>
                  <button style={{ backgroundColor: "red", border: "rounded" }} className="rounded-lg h-10 w-32" >
                    Leave review
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
        <div style={{ flex: "1 1 auto", color: "white" }}>
          <h2 style={{ fontSize: "50px", marginBottom: "10px" }}>
            {movieData.title}
          </h2>
          <h3
            className="pl-32"
            style={{ fontSize: "25px", marginBottom: "10px" }}
          >
            {movieData.tagline}
          </h3>
          <p className="m-10" style={{ fontSize: "22px" }}>
            {movieData.overview}
          </p>
          <br />
          <p style={{ fontSize: "16px" }}>Actors:{movieData.actor} </p>
          <p style={{ fontSize: "16px" }}>More Like This: </p>
          <br />

          Reviews:
        </div>
      </div>
    );
  }
};


export default Details;
