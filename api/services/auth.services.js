import User from '../models/user.model.js'

export const createNewUser = async(data) => {
  try {
    const newUser = await new User(data)
    await newUser.save()

    return newUser
  } catch (error) {
    console.log(error.message);
  }
}

export const findOneByEmail = async(email) => {
  try {
    const user = User.findOne({ email })
    return user
  } catch (error) {
    next(error)
  }
}