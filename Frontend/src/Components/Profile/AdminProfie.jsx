import React,{useState, useEffect} from 'react'
import axios from "axios"

const AdminProfie = () => {

  const id = localStorage.getItem("AdminId")

  const[adminDt, setAdminDt] = useState([])
  const [adminMv, setAdminMv] = useState([])

  const getMovieDetails = async () => {
    let movieDetail
    try{
      movieDetail = await axios.get(`http://localhost:8000/admins/movies/${id}`)
    }
    catch(err){
      console.log(err)
    }
    if(!movieDetail){
      console.log("Error occured")
    }
    // console.log(movieDetail.data)
    return(movieDetail.data.movies)
  }

  const getAdminDetails = async() => {
    let adminDetails 
    try{
      adminDetails = await axios.get(`http://localhost:8000/admins/${id}`)
    }
    catch(err){
      console.log(err)
    }
    if(!adminDetails){
      return console.log("Error occured")
    }
    // console.log(adminDetails.data)
    return(adminDetails.data)
  }



  useEffect( () => {
    getMovieDetails().then(mvRes => {
      setAdminMv(mvRes)
    })
    getAdminDetails().then(adRes => {
      setAdminDt(adRes.adminDetails)
    })
    console.log(adminDt.adminDetails)
  },[])
  return (
   
    <div className='container-fluid profile-container'>
      <div className='row justify-content-evenly user-container'>
        <div className='col-md-4 user-details'>
        <i className="bi bi-person-circle"></i>
        <h4 className='user'>Email: {adminDt.email}</h4>
        </div>
        <div className='col-md-6'> 
        <h1 className='book-heading'>Added Movies</h1> 
       {adminMv && adminMv.map( (p) => {
        return (
          <div className='book-details'>
          <p>Name: {p.title}</p>
          <p>Release Date: {p.releaseDate}</p>
          </div>
        )
       })
       }
        </div>
      </div>
    </div>
  )
}

export default AdminProfie
