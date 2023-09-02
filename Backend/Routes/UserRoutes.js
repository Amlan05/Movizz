
const express = require('express')
const userRouter = express.Router()
const UserControl = require('../Controller/UserController') 

userRouter
 .get('/',UserControl.getAllUsers)
 .post('/signup', UserControl.signUpUser)
 .put('/update/:id', UserControl.updateUser)
 .delete('/delete/:id', UserControl.deleteUser)
 .post('/login', UserControl.userLogin)
 .get("/bookings/:id", UserControl.getBookingsOfUser)
 .get('/:id', UserControl.getUserDetails)

 exports.userRouter = userRouter