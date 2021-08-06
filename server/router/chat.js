import { Router } from "express"

import {
  fetchController,
  joinController,
  quitController,
} from "../controllers/chat.controller.js"
import authMiddleware from "../middleware/auth"

const chatRouter = Router()

chatRouter.get("/", authMiddleware, fetchController)
chatRouter.post("/join", authMiddleware, joinController)
chatRouter.post("/quit", authMiddleware, quitController)

export default chatRouter
