import { Router } from 'express'

import { fetchController, joinController } from '../controllers/chat.controller.js'
import authMiddleware from '../middleware/auth'

const chatRouter = Router()

chatRouter.get('/', authMiddleware, fetchController )
chatRouter.post('/join', authMiddleware, joinController )

export default chatRouter