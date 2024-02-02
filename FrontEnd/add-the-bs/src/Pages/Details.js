import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

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
  }, []);

  if (isLoading) {
    return <h1 className="text-xl text-center">LOADING...</h1>;
  }
  if (Object.keys(movieData).length > 0) {
    return (
      <div>
        <header className="App-header">
          <div className="container text-center justify-content-center">
            <div className="mb-3" style={{ width: "80" }}>
              <div className="row g-0">
                {/* <div className="col-md-4">
                            <img src={movieData.img} className="img-fluid rounded-start" alt="productImg"/>
                        </div> */}
                <div className="d-flex col-md-6">
                  {/* try to get the value outside of these */}
                  {/* {movieData.genre_ids
                    .map((genre_ids) => genre_ids !== "")
                    .join(" | ")} */}
                  <div className="d-flex col-md-12">
                    <div className="card-body justify-content-center">
                      <h2 className="card-title">{movieData.title}</h2>
                      <p className="card-text">
                        <small className="text-body-secondary"></small>
                      </p>
                      <p className="card-text">{movieData.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
};

export default Details;
