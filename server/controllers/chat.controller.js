import User from "../models/user.model"
import Chat from "../models/chat.model"

export const fetchController = async (req, res) => {
  try {
    const chats = await Chat.find({}).exec()
    return res.json(chats)
  } catch (err) {
    throw err
  }
}
