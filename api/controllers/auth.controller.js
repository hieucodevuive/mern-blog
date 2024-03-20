import { authValidate } from "../validation/auth.validate.js"
import { createNewUser } from "../services/auth.services.js"
import bcryptjs from 'bcryptjs'


export const signup = async(req, res) => {
  try {
    //validate dữ liệu
    const validatedData = await authValidate.validateAsync(req.body)
    //Hash password
    const hashPassword = bcryptjs.hashSync(req.body.password, 10)
    //switch hashPassword
    const data = {
      ...validatedData,
      password: hashPassword
    }
    //Thêm vào dữ liệu
    const newUser = await createNewUser(data)
    if(!newUser) return res.json({message: 'The username and email have already been used'})
    return res.status(200).json({message:'User created successfully'})
  } catch (error) {
    // Trả về lỗi dưới dạng JSON nếu có lỗi xảy ra
    res.status(400).json({ message: error.message })
  }
}