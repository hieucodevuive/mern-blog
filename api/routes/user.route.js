import express from 'express'
import { userTest, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test', userTest)
router.put('/update/:userId',verifyToken, updateUser)

export default router