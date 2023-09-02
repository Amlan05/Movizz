import React, {useState, useEffect} from 'react'
import "../Components.css"
import axios from 'axios'

const UserProfile = () => {

  const id = localStorage.getItem("userId")
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState({})

  const getUserDetails = async() => {
    let user
    try{
      user = await axios.get(`http://localhost:8000/users/${id}`)
    }
    catch(err){
    }
    const userData = user.data
    return userData
  }

  const getBookingDetails = async () => {
    let bookDetails
    try{
      bookDetails = await axios.get(`http://localhost:8000/users/bookings/${id}`)
    }
    catch(err){
      console.log(err)
    }
    console.log(bookDetails.data)
    const bookData = bookDetails.data
    return bookData
  }

  const deleteBooking = async(id) => {
    let deletedMovie
    try{
      deletedMovie = await axios.delete(`http://localhost:8000/bookings/delete/${id}`)
    }
    catch(err){
      console.log(err)
    }
    if(!deletedMovie){
      return console.log("Unable to cancel booking")
    }

    console.log(deletedMovie)

    getBookingDetails()
    .then( res => {
      setBookings(res.bookings)
    })
    
  }

  useEffect( () => {

    getUserDetails()
    .then( res => {
      setUser(res.user)
    })
    
    getBookingDetails()
    .then( res => {
      setBookings(res.bookings)
    })
  },[])


  return (
    <div className='container-fluid profile-container'>
      <div className='row justify-content-evenly user-container'>
        <div className='col-md-4 user-details'>
        <i className="bi bi-person-circle"></i>
        <h4 className='user'>Name: {user.name}</h4>
        <h4 className='user'>Email: {user.email}</h4>
        </div>
        <div className='col-md-6'> 
        <h1 className='book-heading'>Bookings</h1> 
       {bookings && bookings.map( (p) => {
        return (
          <div className='book-details'>
          <p>Name: {p.title}</p>
          <p>Seat: {p.seatNumber}</p>
          <p>Date: {p.date}</p>
          <i class="bi bi-trash3-fill" type="button" onClick={() => deleteBooking(p._id)}></i>
          </div>
        )
       })
       }
        </div>
      </div>
    </div>
  )
}

export default  UserProfile
