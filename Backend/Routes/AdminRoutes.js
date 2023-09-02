
const express = require('express')
const adminRouter = express.Router()
const adminControls = require('../Controller/AdminController')

adminRouter
 .post('/signup', adminControls.adminSignup)
 .post('/login', adminControls.adminLogin)
 .get('/', adminControls.getAllAdmins)
 .get('/:id', adminControls.getAdminById)
 .get('/movies/:id', adminControls.getAdminMovies)

 exports.adminRouter = adminRouter