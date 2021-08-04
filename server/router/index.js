import { Router } from 'express'
import authRouter from './auth'
import chatRouter from './chat'

const router = Router()
router.use('/api/auth', authRouter)
router.use('/api/chats', chatRouter)

export default router