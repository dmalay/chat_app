import mongoose, { Schema }  from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      max: 300,
    },
    fromUser: {
      type: Schema.Types.ObjectID, ref: 'user',
      required: true,
    },
    chatID: {
      type: Schema.Types.ObjectID, ref: 'chat',
      required: true,
    }
  },
  { timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

export const MessageModel = mongoose.model("message", messageSchema)
