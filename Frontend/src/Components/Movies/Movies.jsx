import React,{useState, useEffect} from 'react'
import "../Components.css";
import axios from 'axios';
import MovieItem from './MovieItem';
const Movies = () => {

  
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
    <>
     <div className="container-fluid">
      <h1 className='allmovi'>ALL MOVIES</h1>
     <div className="row movie-row-all">
       {movies && movies.map( (p) => {
      return(
        <div className="col-md-4 movie-col-all">
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
    </div>
  
    </>
)
}

export default Movies
