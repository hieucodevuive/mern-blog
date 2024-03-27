import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import { middlewareErrorHandle } from './middleware/middlewareErrorHanlde.js'
import cookieParser from 'cookie-parser'

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

//cors
app.use((req, res, next) => {
  const corsWhitelist = [
      'http://localhost:5173',
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin)
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  }
  next();
});

//cookie
app.use(cookieParser())



app.use(express.json())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

//middleware to hanlde err
app.use(middlewareErrorHandle)