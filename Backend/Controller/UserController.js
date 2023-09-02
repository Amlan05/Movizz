
const User = require('../Model/UserModel')
const bcrypt = require('bcryptjs')
const Booking = require('../Model/BookingModel')

//GETALL_USERS
exports.getAllUsers = async(req, res, next) => {
let users
try{
users = await User.userModel.find()
}
catch(err){
console.log(err)
}
if(!users){
    return res.status(404).json({message: "no users found"})
}
return res.status(200).json({users})
}


//USER_SIGNUP
exports.signUpUser = async(req, res, next) => {
    let newUser
    const {name, email, password} = req.body

    const securePassword = bcrypt.hashSync(password, 10)
    try{
        newUser = new User.userModel({
            name,
            email,
            password: securePassword
        })
     newUser = await newUser.save()
    }
    catch(err){
        console.log(err)
    }
    if(!newUser){
        return res.staus(500).json({message: "unable to add new user"})
    }
    return res.status(201).json({newUser})
}


//UPDATE_USER
exports.updateUser = async (req, res, next) => {
    const id = req.params.id
    const {name, email, password} = req.body

    let updateUser
    const securePassword = bcrypt.hashSync(password, 10)
    try{
        updateUser = await User.userModel.findByIdAndUpdate(id,
            {
                name,
                email,
                password: securePassword
            })
    }
    catch(err){
        console.log(err)
    }

    if(!updateUser){
        return res.status(500).json({message: 'Some error occured'})
    }
    return res.status(200).json({updateUser})
}

// DELETE_USER
exports.deleteUser = async(req, res, next) => {
    let id = req.params.id
    let deletedUser
    try{
        deletedUser = await findByIdAndDelete(id)
    }
    catch(err){
        console.log(err)
    }

    if(!deletedUser){
        return res.status(400).json({message: "Unable to delete user"})
    }
    return res.status(200).json({message: "User successfully deletes", User: deletedUser})

}

// USER_LOGIN
exports.userLogin = async(req, res, next) => {
    const {email, password} = req.body

    
    let existingUser
    try{
        existingUser = await User.userModel.findOne({email})
    }
    catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({message: "No user find with this Id"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: 'Login Successful', user: existingUser})

}

//Bookings of user
exports.getBookingsOfUser = async(req, res, next ) => {
    const id = req.params.id
    let bookings
    try{
       bookings = await Booking.BookingModel.find({user: id})
    //    .populate("movie")
    //    .populate("user")
    }
    catch(err){
       console.log(err)
    }
 
    if(!bookings){
       return res.status(500).json({message: "Unable to get bookings"})
    }
    return res.status(200).json({ bookings })
 }

 //getUserDetails
 exports.getUserDetails = async(req, res, next) => {
    const id = req.params.id
    let user
    try{
        user = await User.userModel.findById(id)
    }
    catch(err){
        console.log(err)
    }

    if(!user){
        return console.log({message: "user details not found"})
    }
    return res.status(200).json({user})
 }