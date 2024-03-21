import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import { middlewareErrorHandle } from './middleware/middlewareErrorHanlde.js'

dotenv.config()
//connect db
mongoose.connect(process.env.MONGO)
.then(
  () => {
    console.log('MongoBd is connected');
  }
)
.catch(err => console.log(err))

//App

const app = express();
app.use(express.json())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

//middleware to hanlde err
app.use(middlewareErrorHandle)