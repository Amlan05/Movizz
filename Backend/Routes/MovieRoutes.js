
const express = require('express')
const movieRouter = express.Router()
const movieControls = require('../Controller/MovieController')
movieRouter
 .get('/', movieControls.getAllMovies)
 .get('/:id', movieControls.getMovieById)
 .post('/add', movieControls.addMovie)



 exports.movieRouter = movieRouter