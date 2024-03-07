import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Movie from "../Components/Movie";

const Details = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState([]);
  const [recMovieData, setRecMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevMoviesLoading, setIsRecMoviesLoading] = useState(true);
  const [showReviewSection, setShowReviewSection] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [userComment, setComment] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const maxCharacters = 120;

  useEffect(() => {
    const sessionKey = sessionStorage.getItem("sessionKey");
    if (sessionKey) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3306/MovieDB/MovieId/${params.id}`)
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
    fetch(`http://localhost:3306/MovieDB/Movie/Similar/${movieData.id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecMovieData(data);
        setIsRecMoviesLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieData.id]);

  useEffect(() => {
    fetch(`http://localhost:3306/review/movie/${movieData.id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieData.id]);

  useEffect(() => {
    fetchPoster(movieData.backdrop_path || movieData.poster_path).then(
      (data) => {
        setIsLoading(false);
        setPosterUrl(data);
      }
    );
  }, [movieData.backdrop_path, movieData.poster_path]);

  const fetchPoster = async (backdropUrl, posterUrl) => {
    try {
      let url;
      if (backdropUrl) {
        url = `http://localhost:3306/MovieDB/Poster${backdropUrl}`;
      } else if (posterUrl) {
        url = `https://localhost:3306/MovieDB/Poster${posterUrl}`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieId = movieData.id;
    const userKey = sessionStorage.getItem("sessionKey");
    const comment = userComment;
    const starRating = selectedStars;
    console.log("On submit clicked");
    fetch(`http://localhost:3306/createReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, userKey, comment, starRating }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((e) => {
        console.error(e);
      })
      .finally(window.location.reload());
  };

  const handleCommentChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxCharacters) {
      setComment(text);
    }
  };

  const handleLeaveReviewClick = () => {
    setShowReviewSection((prev) => !prev);
  };

  function Star({ selected = false, onSelect }) {
    return <FaStar color={selected ? "yellow" : "white"} onClick={onSelect} />;
  }

  function StarRating({ totalStars = 5 }) {
    return (
      <>
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
            onSelect={() => setSelectedStars(i + 1)}
          />
        ))}
      </>
    );
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
      <div className="flex flex-row p-1">
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  }

  function formatDate(dataString) {
    const date = new Date(dataString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  if (isLoading) {
    return <h1 className="text-xl text-center">LOADING...</h1>;
  }

  if (Object.keys(movieData).length > 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: "#282c34",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ flex: "0 0 auto", marginRight: "20px" }}>
          <div className="col-md-4">
            <img
              src={posterUrl}
              className="img-fluid rounded-start"
              alt="productImg"
            />
          </div>
          <div style={{ marginTop: "10px", color: "white" }}>
            <div>
              <p className="text-2xl">
                Rating: <StarRate movieData={movieData} />{" "}
              </p>
            </div>
            <p style={{ fontSize: "23px" }}>
              Runtime: {movieData.runtime} mins
            </p>
            <div style={{ fontSize: "23px" }}>
              Released: {formatDate(movieData.release_date)}{" "}
            </div>
            {isLoggedIn && (
              <button
                onClick={handleLeaveReviewClick}
                style={{ backgroundColor: "Blue", border: "rounded" }}
                className="rounded-lg h-10 w-32"
              >
                {showReviewSection ? "Cancel" : "Leave a Review"}
              </button>
            )}
            {showReviewSection && (
              <div>
                <h1 className="mb-4">Leave your review:</h1>
                <div className="flex mb-4">
                  <StarRating />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium leading-6 text-white-900"
                  >
                    Add your comment
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={4}
                      name="comment"
                      id="comment"
                      className="block p-2 text-lg w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                      value={userComment}
                      onChange={handleCommentChange}
                    />
                    <p className="flex pl-96">
                      {" "}
                      {userComment.length}/{maxCharacters} characters{" "}
                    </p>
                    <button
                      style={{ backgroundColor: "red", border: "rounded" }}
                      className="rounded-lg h-10 w-32"
                      onClick={handleSubmit}
                      disabled={
                        selectedStars < 1 ||
                        selectedStars > 5 ||
                        userComment.length === 0
                      }
                    >
                      Leave review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: "1 1 auto", color: "white" }}>
          <h2
            style={{
              fontFamily: "revert",
              fontSize: "70px",
              marginBottom: "10px",
            }}
          >
            {" "}
            {movieData.title}{" "}
          </h2>
          <h3
            className="pl-32 underline underline-offset-4"
            style={{
              fontFamily: "revert-layer",
              fontSize: "25px",
              marginBottom: "10px",
            }}
          >
            {movieData.tagline}
          </h3>
          <p
            className="container w-2/3 text-wrap m-10"
            style={{ fontSize: "22px" }}
          >
            {" "}
            {movieData.overview}{" "}
          </p>
          <br />
          <p style={{ fontSize: "16px" }}>Actors: {movieData.actor} </p>
          <p style={{ fontSize: "16px" }}>More Like This: </p>
          {/* {!isRevMoviesLoading && (
            <div className="container w-2/3 overflow-hidden overflow-x-scroll scroll whitespace-nowrap scroll-smooth ">
            <ul className="flex">
              {recMovieData.results?.filter(movie => movie.poster_path !== null).map((movie) => (
                <li key={movie.id} className="p-9 cursor-pointer hover:scale-105 ease-in-out duration-300">
                  <Movie movie={movie} />
                </li>
              ))}
            </ul>
          </div>
          )} */}
          <br />
          Reviews:
          <div>
            <ul className="mt-5 container flex flex-col text-base">
              <li className="grid grid-cols-5 gap-4 text-lg text-center">
                <div>
                  <b>MovieId</b>
                </div>
                <div>
                  <b>User Keys</b>
                </div>
                <div>
                  <b>Comment</b>
                </div>
                <div>
                  <b>Star Rating</b>
                </div>
              </li>
              <hr className="mb-5" />

              {reviews?.map((review) => (
                <>
                  <li
                    key={review.id}
                    className="grid grid-cols-5 gap-4 p-6 place-items-center"
                  >
                    <div className="mr-6">{review.movieId}</div>
                    <div>
                      {review.userKey ? <>{review.userKey}</> : <>NO KEY</>}
                    </div>
                    <div className="max-w-xs overflow-auto">
                      {review.comment ? (
                        <div>{review.comment}</div>
                      ) : (
                        <>NO COMMENT</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {review.starRating ? (
                        <>{review.starRating}</>
                      ) : (
                        <>NO Star Rating Found</>
                      )}
                    </div>
                  </li>
                  <hr className="mb-5" />
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
