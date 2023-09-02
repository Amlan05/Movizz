import React, { useState, useEffect } from "react";
import "../Components.css";
import axios from 'axios'
import {Link} from 'react-router-dom'
import MovieItem from "../Movies/MovieItem";

const HomePage = () => {

  const [movies, setMovies] = useState([]);

  const sendRequest = async () => {
    try{
    const res = await axios.get('http://localhost:8000/movies')
    const data = await res.data
    // console.log(data.movies)
    return data
}
catch(err){
    console.log(err)
}
}

useEffect( () => {
sendRequest()
.then( res => {
//  console.log(res.movies)
 setMovies(res.movies)
})


},[])

  return (
    <div className="Homepage">
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/events/et00338629-xlyrathmlr-landscape.jpg"
              className="d-block w-100 img-fluid"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Latest Releases</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ytimg.com/vi/Y6ZKXqM7HNQ/maxresdefault.jpg"
              className="d-block w-100 img-fluid"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Latest Releases</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.koimoi.com/wp-content/new-galleries/2023/08/the-team-of-dream-girl-2-unveil-a-never-done-before-multi-city-promotional-extravaganza-dream-girl-ke-rang.jpg"
              className="d-block w-100 img-fluid"
              alt="..."
              img-fluid
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Latest Releases</h5>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-evenly">
          <div className="col-md-3">
            <h1>New Releases</h1>
          </div>
        </div>
        <div className="row justify-evenly movie-col">
       {movies && movies.slice(0, 4).map( (p) => {
        return(
        <div className="col-md-3 movie-col">
        <MovieItem

        id={p._id}
        posterUrl={p.posterUrl}
        title={p.title}
        description={p.description}
        releaseDate={p.releaseDate}
        
        ></MovieItem>
        </div>
        )
       })

       }
        </div>
        <div className="row justify-content-end allMovies-btn">
          <div className="col-md-6">
          <Link to="/movies"><button type="button" className="btn btn-primary" >View All Movies</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
