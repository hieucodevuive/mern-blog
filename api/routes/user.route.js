import express from 'express'
import { userTest, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test', userTest)
//Lỗi app rqd token = undefine nhưng vẫn hoạt động trên postman
// router.put('/update/:userId',verifyToken, updateUser)
router.put('/update/:userId', updateUser)

export default router