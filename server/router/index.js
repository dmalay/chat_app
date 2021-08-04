import { Router } from 'express'
import authRouter from './auth'
import chatRouter from './chat'
import userRouter from './user'

const router = Router()
router.use('/api/auth', authRouter)
router.use('/api/chats', chatRouter)
router.use('/api/users', userRouter)

export default router