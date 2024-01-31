import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const [movieData, setMovieData] = useState([]);
    let id = useParams().id;

    useEffect(() => {
        fetch(`http://localhost:3001/MovieDB/MovieId/${id}`)
        .then(response => response.json())
        .then(data => {
            setMovieData(data);
            console.log("Testing to show more info: " + data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [id]);

    if(Object.keys(movieData).length > 0) { return (
        <div>
            <header className="App-header">
            <div className='container text-center justify-content-center'>
                <div className="mb-3" style={{width: "80"}}>
                    <div className="row g-0">
                        {/* <div className="col-md-4">
                            <img src={movieData.img} className="img-fluid rounded-start" alt="productImg"/>
                        </div> */}
                        <div className="d-flex col-md-6">
                            <div className="d-flex col-md-12">
                                <div className="card-body justify-content-center">
                                    <h2 className="card-title">{movieData.title}</h2>
                                    <p className="card-text"><small className="text-body-secondary">{movieData.genre_ids.filter(genre_ids => genre_ids !== "").join(" | ")}</small></p>
                                    <p className="card-text">{movieData.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </header>
        </div>
        )
    }
}

export default Details