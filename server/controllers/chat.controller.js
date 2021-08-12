import User from "../models/user.model"
import Chat from "../models/chat.model"
import Message from "../models/message.model"

export const fetchController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const chats = await Chat.find({}).populate('subscribers',['login', 'type'])
    const actualChat = await Chat.findById(user.defaultChatID).populate('messages').populate( 'subscribers',['login', 'type'])

    return res.status(200).json({ message: "initial data fetched", chats, actualChat })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const getController = async (req, res) => {
  try {
    const { chatId } = req.params
    const actualChat = await Chat.findById(chatId).populate('messages').populate( 'subscribers',['login', 'type']).exec()
    return res.status(200).json({ message: "chat data fetched", actualChat })

  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}

export const joinController = async (req, res) => {
  try {
    const { userID, _id } = req.body
    await Chat.findByIdAndUpdate({ _id }, { $push: { subscribers: userID } })
    const chats = await Chat.find({}).populate('subscribers',['login', 'type']).exec()
    return res.status(200).json({ message: "successfully joined", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const quitController = async (req, res) => {
  try {
    const { userID, _id } = req.body
    await Chat.findByIdAndUpdate({ _id }, { $pull: { subscribers: userID } })
    const chats = await Chat.find({}).populate('subscribers',['login', 'type']).exec()
    return res.status(200).json({ message: "successfully quitted", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const createController = async (req, res) => {
  try {
    const { name, title, _id, type, idForDm } = req.body
console.log(idForDm)





    const chatExists = type === 'private'
    ? await Chat.exists( {type: 'private', subscribers: { _id: _id, _id: idForDm } })
    : await Chat.exists({ name })

    // if(type === 'private'){
    //   const authChat = await Chat.find({type: 'private', subscribers: { _id: _id, _id: idForDm } }).lean()
    //   const istrue = await Chat.exists( {type: 'private', subscribers: { _id: _id, _id: idForDm } })
    //   // .exists({subscribers:{_id: idForDm}})
    //   // .exists( {subscribers: { _id: idForDm }})
      console.log('console', chatExists)
    

    // const chatExists = (
    //   type === 'private'
    // ? await Chat.exists( {subscribers: { _id: _id, _id: idForDm }})
    // : await Chat.exists({ name })
    // )
// console.log(chatExists)

// if(type === 'private'){
  //   chatExists = Chat.exists( {subscribers: { _id: _id, _id: idForDm }})
  // }
  
  
  
  // const chatExists = await Chat.exists({ name })

    if (chatExists) {
      return res.status(400).json({ message: "chat already exists" })
    }

    const chat = new Chat({ name, title, type, creator: _id })
    if(type === 'private') {
      chat.subscribers.push(idForDm)
    }
    chat.subscribers.push(_id)
    await chat.save()
    const chats = await Chat.find({}).populate('subscribers',['login', 'type']).exec()
    console.log(chat.name, chat)
    return res.status(200).json({ message: "new chat created", chats })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
