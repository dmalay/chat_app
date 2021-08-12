import mongoose, { Schema } from "mongoose"
import { MessageModel } from "./message.model"

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 80,
      min: 3,
    },
    name: {
      type: String,
      required: true,
      max: 20,
      min: 3,
    },
    type: {type: String, required: true },
    creator: { type: Schema.Types.ObjectID, ref: "user" },
    subscribers: [{ type: Schema.Types.ObjectID, ref: "user" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

chatSchema.virtual("messages", {
  ref: MessageModel,
  localField: "_id",
  foreignField: "chatID",
})

export default mongoose.model("chat", chatSchema)
