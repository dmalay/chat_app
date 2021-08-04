import { Router } from 'express'

import { updateController } from '../controllers/user.controller'
import authMiddleware from '../middleware/auth'

const chatRouter = Router()

chatRouter.post('/update', authMiddleware, updateController)

export default chatRouter