
const Admin = require('../Model/AdminModel')
const Movies = require('../Model/MovieModel')
const bcrypt = require('bcryptjs')


//ADMIN_SIGNUP
exports.adminSignup = async(req, res, next) => {
    let newAdmin
    let existingAdmin
    const {email, password} =req.body

    try{
        existingAdmin = await Admin.AdminModel.findOne({email})
    }
    catch(err){
        return console.log(err)
    }
    if(existingAdmin){
        return res.status(400).json({message: "User already exist, Login Instead"})
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10)
    try{
        newAdmin = new Admin.AdminModel({
            email,
            password: hashedPassword
        })
        newAdmin= await newAdmin.save()
    }
    catch(err){
        console.log(err)
    }

    if(!newAdmin){
        return res.status(500).json({message: "Some Error Occured"})
    }
    return res.status(201).json({message: 'SignUp successful', admin: newAdmin})
}

//ADMIN_LOGIN
exports.adminLogin = async(req, res, next) => {
    let existingAdmin
    const {email, password} = req.body

    try{
        existingAdmin = await Admin.AdminModel.findOne({email})
    }
    catch(err){
        console.log(err)
    }

    if(!existingAdmin){
        return res.status(404).json({message: "No user found with this email"})
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password"})
    }


    return res.status(200).json({message: "Login Successful", admin: existingAdmin})
}


exports.getAllAdmins = async(req, res, next) => {
    let admins
    try{
        admins = await Admin.AdminModel.find()
    }
    catch(err){
        console.log(err)
    }

    if(!admins){
        return res.status(404).json({message: "No admins found"})
    }
    return res.status(200).json({admins: admins})
}

exports.getAdminById = async(req, res, next) => {
    let adminDetails
    const id = req.params.id
    try{
        adminDetails = await Admin.AdminModel.findById(id)
    }
    catch(err){
        console.log(err)    
    }
    if(!adminDetails){
        return res.status(404).json({message: "No admin Found"})
    }
    return res.status(200).json({adminDetails})
}

exports.getAdminMovies = async(req, res, next) => {
    const id = req.params.id
    let movies
    try{
        movies = await Movies.movieModel.find({admin: id})
    }
    catch(err){
        console.log(err)
    }

    if(!movies){
        return res.status(404).json({message: "No movies Found"})
    }
    return res.status(200).json({movies})
}