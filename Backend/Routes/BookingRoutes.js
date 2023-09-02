

const express = require('express')
const bookingRouter = express.Router()
const bookingControls = require('../Controller/BookingController')
bookingRouter
 .post('/', bookingControls.newBooking)
 .get('/:id', bookingControls.getBookingById)
 .delete('/delete/:id', bookingControls.deleteBooking)

 exports.bookingRouter = bookingRouter