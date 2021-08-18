import User from "../models/user.model"
import Chat from "../models/chat.model"
import Message, { MessageModel } from "../models/message.model"

export const fetchController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const chats = await Chat.find({}).populate("subscribers", ["login", "type"])
    const actualChat = await Chat.findById(user.defaultChatID)
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 20, skip: 0 },
      })
      .populate("subscribers", ["login", "type"])

    // const msgNumber = await MessageModel.countDocuments({
    //   chatID: actualChat._id,
    // })
    // const messages = await MessageModel.find({ chatID: actualChat._id }, null, {
    //   sort: { createdAt: -1 },
    //   limit: 5,
    //   skip: 0,
    // })
    // const somedata = await Chat.findById(user.defaultChatID).populate({
    //   path: "messages",
    //   options: { sort: { createdAt: -1 }, limit: 10, skip: 0 },
    // })

    // console.log('somedata >>>>>>',messages)
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
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 20, skip: 0 },
      })
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
            $and: [
              { type: { $eq: "private" } },
              { subscribers: { $eq: _id } },
              { subscribers: { $eq: idForDm } },
            ],
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
    return res.status(200).json({ message: "new chat created", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const deleteController = async (req, res) => {
  try {
    const { chatId } = req.params
    const { user } = req
    const chat = await Chat.findById(chatId).lean()
    if (chat.type === "public") {
      return res.status(400).json({ message: "you cannot delete public chat" })
    }

    const user1 = await User.findById(user._id).lean()
    const hasMessages = await MessageModel.exists({ chatID: chatId })
    if (hasMessages) {
      await MessageModel.deleteMany({ chatID: chatId })
    }

    await Chat.findByIdAndRemove(chatId)
    console.log(`chat ${chat.title} deleted by user${user1.login}`)
    return res
      .status(200)
      .json({ message: "private chat and messages successfully deleted" })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const messagesController = async (req, res) => {
  try {
    const { chatId, page } = req.query
    const limit = 20
    const skip = page >= 1 ? page * limit : 0
    
    const msgNumber = await MessageModel.countDocuments({
      chatID: chatId,
    })
    const totalPages = Math.ceil(msgNumber / limit)
    const messages = await MessageModel.find({ chatID: chatId }, null, {
      sort: { createdAt: -1 },
      limit: limit,
      skip: skip,
    })
    
    if (page > totalPages) {
      return res
      .status(200)
      .json({ message: "no paginated messages", messages: [] })
    }
    const pagination = { page, totalPages }

    return res.status(200).json({ message: "paginated messages", messages, pagination })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
