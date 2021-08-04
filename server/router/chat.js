import { Router } from 'express'

import { fetchController } from '../controllers/chat.controller.js'
import authMiddleware from '../middleware/auth'

const chatRouter = Router()

chatRouter.get('/', authMiddleware, fetchController )

export default chatRouter