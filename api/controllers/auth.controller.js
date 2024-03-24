import { authValidate, signinValidate } from "../validation/auth.validate.js"
import { createNewUser, findOneByEmail } from "../services/auth.services.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const signup = async(req, res, next) => {
  try {
    //validate dữ liệu
    const validatedData = await authValidate.validateAsync(req.body)
    if (!validatedData) return next(errorHandler(400, 'All fields are required'))
    //Hash password
    const hashPassword = bcryptjs.hashSync(req.body.password, 10)
    //switch hashPassword
    const data = {
      ...validatedData,
      password: hashPassword
    }
    //Thêm vào dữ liệu
    const newUser = await createNewUser(data)
    if(!newUser) return next(errorHandler(400, 'The username and email have already been used'))
    return res.status(200).json({message:'User created successfully'})
  } catch (error) {
    // Trả về lỗi dưới dạng JSON nếu có lỗi xảy ra
    next(error)
  }
}

export const signin = async(req, res, next) => {
  const validateData = await signinValidate.validateAsync(req.body)
  if (!validateData) {
    return next(errorHandler(400,'All fields are required'))
    
  }
  const { email, password } = validateData

  try {
    const validUser = await findOneByEmail(email)
    if (!validUser) {
      return next(errorHandler(404, 'user not found'))
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(400,'Invalid password'))
    }
    // authenticate dung json web token de biet rang nguoi dung da dang nhap
    const token = jwt.sign(
      {id: validUser._id}, process.env.JWT_SECRET
    )

    const { password: pass, ...rest } = validUser._doc

    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json(rest)

  } catch (error) {
    next(error)
  }
  
}

export const google = async(req, res, next) => {
  const {email, username, googlePhotoUrl} = req.body
  console.log(req.body);
  try {
    const user = await User.findOne({email})
    if(user) {
      const token = jwt.sign(
        {id: user._id}, process.env.JWT_SECRET
        )
      const { password: pass, ...rest } = user._doc
      res.status(200).cookie('access_token', token, {
        httpOnly: true
      }).json(rest)
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username: username.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      })
      await newUser.save()
      const token = jwt.sign(
        {id: newUser._id}, process.env.JWT_SECRET
        )
      const { password: pass, ...rest } = newUser._doc
      res.status(200).cookie('access_token', token, {
        httpOnly: true
      }).json(rest)
    }
  } catch (error) {
    next(error)
  }
}