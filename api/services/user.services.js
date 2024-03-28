import User from '../models/user.model.js'

export const updateUserById = async (userId, user) => {
  try {
    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        password: user.password
      },
    }, { new: true })
    return result
  } catch (error) {
    console.log(error)
  }
}
