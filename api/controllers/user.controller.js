import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { updateUserById } from '../services/user.services.js'

export const userTest = (req, res) => {
  res.json({message: 'Api is working'})
}

export const updateUser = async(req, res, next) => { 
  // if (req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to update this user!'))
  // }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'User name must be between 7 and 20 characters'))
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'User name cannot contain spaces'))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'User name must be lowercase'))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'User name only contain letters and numbers'));
    }
  }
  try {
    console.log(req.body);
    const updateUser = await updateUserById(req.params.userId, req.body)
    const { password, ...rest } = updateUser._doc
    return res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {  
  try {
    if(req.params.userId) {
      console.log(req.params.userId)
      const result = await User.findByIdAndDelete(req.params.userId)
      if (result) return res.status(200).json('Deleted user successfully')
      else return next(errorHandler(400, 'Delete user failed'))
    }
    next(errorHandler(400, 'User not found'))
  } catch (error) {
    next(error)
  }
}

export const signoutUser = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out')
  } catch (error) {
    next(error)
  }
}