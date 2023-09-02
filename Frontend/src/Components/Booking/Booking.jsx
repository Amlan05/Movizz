import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [inputs,setInputs] = useState({})

  const getMovieDetails = async () => {
    let movieDetail;
    // console.log(id);

    try {
      movieDetail = await axios.get(`http://localhost:8000/movies/${id}`);
    } catch (err) {
      console.log(err);
    }

    if (!movieDetail) {
      console.log("Unexpected error");
    }
    const resData = await movieDetail.data;
    console.log(resData)
    return resData;
  };

  const handleChange = (e) => {
    setInputs({
        ...inputs,
        [e.target.name]:e.target.value
    })
  }

  const submission = (e) => {
    e.preventDefault()
    newBooking()
    .then( res => {
        console.log(res)
    })
  }

  const newBooking = async() => {
    let res
    try{
    res = await axios.post("http://localhost:8000/bookings", {
        movie:movie._id,
        title:movie.title,
        date:inputs.date,
        seatNumber:inputs.seatNumber,
        user: localStorage.getItem("userId")
    })}
    catch(err){
        console.log(err)
    }

    if(!res){
        return console.log("Unexpexted error")
    }
    
    const resData = await res.data
    return resData
  }

  useEffect(() => {
    getMovieDetails()
      .then((res) => {
        setMovie(res.movie);
        setActors(res.movie.actors);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(movie._id);
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 movie-title">
          <h1>Book Tickets of Movie: {movie.title}</h1>
        </div>
      </div>
      <div className="row movie-detail justify-content-center">
        <div className="col-md-5">
          <img src={movie.posterUrl} className="movie-poster" />
          <div>
            <h5>Description </h5>
            <p>{movie.description}</p>
          </div>
          <div>
            <h5>Cast </h5>
            <p>{actors.map((p) => p + " ")}</p>
          </div>
          <div>
            <h5>Release Date </h5>
            <p>{movie.releaseDate}</p>
          </div>
        </div>
        <div className="col-md-5">
          <form  className="booking-form" onSubmit={submission}>
            <div className="mb-3">
              <label className="form-label">
                Seat Number
              </label>
              <input
                type="number"
                name="seatNumber"
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Booking Date
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
