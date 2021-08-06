import User from "../models/user.model"
import Chat from "../models/chat.model"

export const fetchController = async (req, res) => {
  try {
    const chats = await Chat.find({}).exec()
    return res.json(chats)
  } catch (err) {
    return res.status(500).json({ error: e.message })
  }
}

export const joinController = async (req, res) => {
  try {
    const { userID, _id } = req.body
    console.log(req.body)
    await Chat.findByIdAndUpdate({ _id }, { $push: { subscribers: userID } })
    const chats = await Chat.find({}).exec()
    return res.status(200).json({ message: "successfully joined", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
