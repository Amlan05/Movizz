
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

const userRouter = require('./Routes/UserRoutes')
const adminRouter = require('./Routes/AdminRoutes')
const movieRouter = require('./Routes/MovieRoutes')
const bookingRouter = require("./Routes/BookingRoutes")
const cors = require('cors')

//midddlewares
app.use(express.json())
app.use(cors())
app.use('/users', userRouter.userRouter)
app.use('/admins', adminRouter.adminRouter)
app.use('/movies', movieRouter.movieRouter)
app.use('/bookings', bookingRouter.bookingRouter)

//Mongoose Connect
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.MONGODB_PASSWORD}:Amlan@cluster0.3tydzo7.mongodb.net/?retryWrites=true&w=majority`);
  console.log('Database Connected')
}

//Server Connection
app.listen('8000', () => {
    console.log('server started')
})