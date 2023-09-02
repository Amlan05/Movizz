
const Booking = require('../Model/BookingModel')
const Movie = require('../Model/MovieModel')
const mongoose = require('mongoose')
// const User = require('../Model/UserModel')
const User = require('./../Model/UserModel')

exports.newBooking = async(req, res, next) => {
    const {movie, title, date, seatNumber, user} = req.body
     let booking

     let existingMovie
     let existingUser
     try{
      existingMovie = await Movie.movieModel.findById(movie)
      existingUser = await User.userModel.findById(user)
     }
     catch(err){
      console.log(err)
     }

     if(!existingMovie){
      return res.status(404).json({message: "Movie Not Found with given id"})
     }

     if(!existingUser){
      return res.status(404).json({ message: "User not Found with given id"})
     }

     try{
        booking = new Booking.BookingModel( {
            movie,
            title,
            date: new Date(`${date}`),
            seatNumber, 
            user
        })
      //   booking = await booking.save()
   
      const session = await mongoose.startSession()
      session.startTransaction()
      existingUser.bookings.push(booking)
      existingMovie.bookings.push(booking)
      await existingUser.save({session})
      await existingMovie.save({session})
      await booking.save({ session });
      await session.commitTransaction()
     }
     catch(err){
        console.log(err)
     }

     if(!booking){
        return res.status(500).json({message: "Unable to add new Booking"})
     }
     return res.status(201).json({booking: booking})

}

exports.getBookingById = async(req, res, next) => {
   const id = req.params.id
   let bookings
   try{
      bookings = await Booking.BookingModel.findById(id)
   }
   catch(err){
      console.log(err)
   }

   if(!bookings){
      return res.status(500).json({message: "Unexpexted Error"})
   }
   return res.status(200).json({bookings})
}

exports.deleteBooking = async(req, res,  next) => {
   const id = req.params.id
   let booking
   try{
      booking = await Booking.BookingModel.findByIdAndRemove(id).populate("user movie")
      const session = await mongoose.startSession()
      session.startTransaction()
      await booking.user.bookings.pull(booking)
      await booking.movie.bookings.pull(booking)
      await booking.user.save({session})
      await booking.movie.save({session})
      await session.commitTransaction()
   }
   catch(err){
      console.log(err)
   }

   if(!booking){
      return res.status(500).json({message: "Unable to delete"})
   }
   return res.status(200).json({message: "Successfully deleted"})
}

exports.findBookingsByMovieName = (req, res, next) => {
   let 
}
