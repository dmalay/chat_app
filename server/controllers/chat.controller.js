import User from "../models/user.model"
import Chat from "../models/chat.model"
import Message from "../models/message.model"

export const fetchController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const chats = await Chat.find({}).populate("subscribers", ["login", "type"])
    const actualChat = await Chat.findById(user.defaultChatID)
      .populate("messages")
      .populate("subscribers", ["login", "type"])

    return res
      .status(200)
      .json({ message: "initial data fetched", chats, actualChat })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const getController = async (req, res) => {
  try {
    const { chatId } = req.params
    const actualChat = await Chat.findById(chatId)
      .populate("messages")
      .populate("subscribers", ["login", "type"])
      .exec()
    return res.status(200).json({ message: "chat data fetched", actualChat })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const joinController = async (req, res) => {
  try {
    const { authID, _id } = req.body
    await Chat.findByIdAndUpdate({ _id }, { $push: { subscribers: authID } })
    const chats = await Chat.find({})
      .populate("subscribers", ["login", "type"])
      .exec()
    return res.status(200).json({ message: "successfully joined", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const quitController = async (req, res) => {
  try {
    const { authID, _id } = req.body
    await Chat.findByIdAndUpdate({ _id }, { $pull: { subscribers: authID } })
    const chats = await Chat.find({})
      .populate("subscribers", ["login", "type"])
      .exec()
    return res.status(200).json({ message: "successfully quitted", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const createController = async (req, res) => {
  try {
    const { name, title, _id, type, idForDm } = req.body

    const chatExists =
      type === "private"
        ? await Chat.exists({
            type: "private",
            subscribers: { _id: _id, _id: idForDm },
          })
        : await Chat.exists({ name })


    if (chatExists) {
      return res.status(400).json({ message: "chat already exists" })
    }

    const chat = new Chat({ name, title, type, creator: _id })
    if (type === "private") {
      chat.subscribers.push(idForDm)
    }
    chat.subscribers.push(_id)
    await chat.save()
    const chats = await Chat.find({})
      .populate("subscribers", ["login", "type"])
      .exec()
    console.log(chat.name, chat)
    return res.status(200).json({ message: "new chat created", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const deleteController = async (req, res) => {
  try {
    const { chatId } = req.params
    const { user } = req
    // console.log("iid", chatId, "params", user)

    const chat = await Chat.findById(chatId).lean()
    // const somedata = await Chat.exists({
    //   type: "private",
    //   subscribers: { _id: user._id },
    // })

    // console.log("chat", chat, "somedata", somedata)

    if (chat.type === "public") {
      return res.status(400).json({ message: "you cannot delete public chat" })
    }

    const user1 = User.findById(user._id).lean()
    console.log(`chat ${chat.title} deleted by user${user1.login}`)

    await Chat.findByIdAndRemove(chatId)
    return res
      .status(200)
      .json({ message: "private chat successfully deleted" })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
