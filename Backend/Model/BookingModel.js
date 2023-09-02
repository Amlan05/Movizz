
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserModel = require('./UserModel') 
const MovieModel= require('./MovieModel')


const bookingSchema = new Schema( {
    movie:{type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    title:{type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
   

})

exports.BookingModel = mongoose.model('Booking', bookingSchema)

//bookings