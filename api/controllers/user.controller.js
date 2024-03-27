import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import { updateUserById } from '../services/user.services.js'

export const userTest = (req, res) => {
  res.json({message: 'Api is working'})
}

export const updateUser = async(req, res, next) => { 
  console.log(req.params.userId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user!'))
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username only contain letters and numbers'));
    }
    try {
      const updateUser = await updateUserById(req.params.userId, req.body)
      const { password, ...rest } = updateUser._doc
      return res.status(200).json(rest)
    } catch (error) {
      next(error)
    }
  }
}