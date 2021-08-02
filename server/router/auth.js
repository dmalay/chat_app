import { Router } from 'express'

import { loginController, registerController, tokenController } from '../controllers/auth.controller'

const authRouter = Router()

authRouter.get('/login', tokenController)
authRouter.post('/login', loginController)
authRouter.post('/register', registerController)

export default authRouter