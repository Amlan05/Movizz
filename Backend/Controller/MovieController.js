
const mongoose = require('mongoose')

const Admin = require('../Model/AdminModel')
const Movie = require('../Model/MovieModel')




exports.addMovie = async(req, res, next) => {


     //CREATE_NEWMOVIE
     const {title, description, releaseDate, posterUrl, featured, actors, admin} = req.body

        let newMovie
        try{
            newMovie = new Movie.movieModel({
                title,
                description,
                releaseDate :new Date(`${releaseDate}`),
                featured,
                actors,
                posterUrl,
                admin
            })

            // newMovie = await newMovie.save()

            const session  = await mongoose.startSession()
            const adminUser = await Admin.AdminModel.findById(admin)
            session.startTransaction()
            await newMovie.save({session})
            adminUser.addedMovies.push(newMovie)
            await adminUser.save({session})
            await session.commitTransaction()
        }
        catch(err){
            return console.log(err)
        }

        if(!newMovie){
            return res.status(500).json({message: "Unable to add Movie"})
        }
        return res.status(201).json({message: "Movie added successfully", movie: newMovie})
}

exports.getAllMovies = async(req, res, next) => {
    let movies

    try{
        movies = await Movie.movieModel.find()
    }
    catch(err){
        console.log(err)
    }

    if(!movies){
        return res.status(500).json({message: "Request Failed"})
    }
    return res.status(200).json({movies: movies})
}

exports.getMovieById = async(req, res, next) => {
const id = req.params.id
let movie
try{
movie = await Movie.movieModel.findById(id)
}
catch(err){
    console.log(err)
}

if(!movie){
    return res.status(404).json({message: "No movie found"})
}
return res.status(200).json({movie: movie})
}