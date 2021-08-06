import { Router } from "express"

import {
  fetchController,
  joinController,
  quitController,
  createController
} from "../controllers/chat.controller.js"
import authMiddleware from "../middleware/auth"

const chatRouter = Router()

chatRouter.get("/", authMiddleware, fetchController)
chatRouter.post("/join", authMiddleware, joinController)
chatRouter.post("/quit", authMiddleware, quitController)
chatRouter.post('/create', authMiddleware, createController)

export default chatRouter
