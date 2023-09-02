import React, {useState} from "react";
import "../Components.css"
import axios from 'axios'

const AddMovie = () => {

    const[inputs, setInputs] = useState({})
    const [checked, setChecked] = useState(true)
    const [actor, setActor] = useState([""])
    const [actors, setActors] = useState([])
    

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleChecked = (e) => {
        setChecked(!checked)
        setInputs({
            ...inputs,
            [e.target.name]: checked
        })
    }

    const addMovie = async () => {
       let movie
       try{
        movie = await axios.post("http://localhost:8000/movies/add", {
            title: inputs.title,
            description: inputs.description,
            releaseDate: inputs.releaseDate,
            posterUrl: inputs.posterUrl,
            featured: checked,
            actors: actors,
            admin: localStorage.getItem("AdminId") 
        })
       }
       catch(err){
        console.log(err)
       }
       console.log(movie)
    }

    const submission = (e) => {
        e.preventDefault()
        // console.log(inputs, actors)
        addMovie()
    }



  return (
    <div className="container-fluid add-movie-container">
        <div className="row justify-content-center add-movie-row">
            <div className="col-md-6 add-movie-col">
                <h1 className="add-movie-header">Add New Movie</h1>
      <form onSubmit={submission}>
        <div className="mb-3">
          <label className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Potser Url
          </label>
          <input
            type="text"
            name="posterUrl"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Release Date
          </label>
          <input
            type="date"
            name="releaseDate"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div >
          <label className="form-label">
            Actors
          </label>
          <div className="actor-div">
          <input
            type="text"
            name="actors"
            value={actor}
            className="form-control"
            onChange={(e) => {
                setActor(e.target.value)
            }}
          />
          <button type="button" className="btn btn-outline-info" onClick={() => {
            setActors([...actors, actor])
            setActor([""])
          }}>Add</button>
          </div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="featured"
            onClick={handleChecked}
          ></input>
          <label className="form-check-label" name="featured">
            Featured
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddMovie;
