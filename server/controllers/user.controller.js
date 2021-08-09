import User from "../models/user.model"
import Chat from "../models/chat.model"

export const updateController = async (req, res) => {
  try {
    const { _id, defaultChatID } = req.body.user

    await User.findByIdAndUpdate({ _id }, {defaultChatID})

    return res
      .status(200)
      .json({ message: "default chat updated" })
  } catch (err) {
    return res.status(500).json({ error: e.message })
  }
}
