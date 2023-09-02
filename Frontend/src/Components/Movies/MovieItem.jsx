import React from "react";
import "../Components.css"
import { Link } from "react-router-dom";

const MovieItem = (props) => {


  return (
    <div className="card">
      <img src={props.posterUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
        {new Date(props.releaseDate).toDateString()}
        </p>
        <p className="card-text">
          {props.description}
        </p>
        <Link to={`/booking/${props.id}`}><a href="#" className="btn btn-primary">
          Book Now
        </a></Link>
      </div>
    </div>
  );
};

export default MovieItem;
