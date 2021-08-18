import { Router } from "express"

import {
  fetchController,
  getController,
  joinController,
  quitController,
  createController,
  deleteController,
  messagesController
} from "../controllers/chat.controller.js"
import authMiddleware from "../middleware/auth"

const chatRouter = Router()

chatRouter.get("/", authMiddleware, fetchController)
chatRouter.get('/messages', authMiddleware, messagesController)
chatRouter.get('/current:chatId', authMiddleware, getController)
chatRouter.post("/join", authMiddleware, joinController)
chatRouter.post("/quit", authMiddleware, quitController)
chatRouter.post('/create', authMiddleware, createController)
chatRouter.delete('/:chatId', authMiddleware, deleteController)

export default chatRouter
