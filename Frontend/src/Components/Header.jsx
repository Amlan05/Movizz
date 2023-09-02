import React, {useState, useEffect} from "react";
import "./Components.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminActions, userActions } from "../Store";
import axios from 'axios'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const[movies, setMovies] = useState([])
  const[searchedMovie, setSearchedMovie] = useState("")

  const getAllMovies = async() => {
    let movies
    try{
      movies = await axios.get('http://localhost:8000/movies')
    }
    catch(err){
      console.log(err)
    }

    if(!movies){
      return console.log("No movies Found")
    }
   
    return (movies.data)
  }

  const logout = (isAdmin) => {
    if(isAdmin === true){
      dispatch(adminActions.logout())
      localStorage.removeItem("AdminId")
    }
    else if(isAdmin === false){
      dispatch(userActions.logout())
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
    }
  }

  const changeHandler = (e) => {
    let movieName = e.target.value
    if(movieName === ""){
      return
    }
   
  }

  const submission = () => {
    const mov = movies.find((p) => p.title === searchedMovie)
    console.log(mov._id)
    navigate(`/booking/${mov._id}`)
  }

  useEffect( () => {
    getAllMovies()
    .then(res => {
      setMovies(res.movies)
    })
    console.log(movies)
  },[])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-warning bg-body-light header">
        <div className="container-fluid">
          <div className="brand-logo">
            <Link to="/">
              <a className="navbar-brand">
                <i class="bi bi-film"></i>
              </a>
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Movies"
                aria-label="Search"
                onChange = {changeHandler}
              />
              <button className="btn btn-outline-success" type="button" onClick={submission}>
                Search
              </button>
            </form>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/movies" className="nav-link">
                  <b>Movies</b>
                </Link>
              </li>
              {!isAdminLoggedIn && !isUserLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      <b>Admin</b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/auth" className="nav-link">
                      <b>Auth</b>
                    </Link>
                  </li>
                </>
              )}
              {isUserLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/user" className="nav-link">
                      <b>Profile</b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={() => logout(false)}>
                      <b>Logout</b>
                    </Link>
                  </li>
                </>
              )}
              {isAdminLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/add" className="nav-link">
                      <b>Add Movie</b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin-profile" className="nav-link">
                      <b>Profile</b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={() => logout(true)}>
                      <b>Logout</b>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
