import mongoose, { Schema } from "mongoose"

const chatSchema = new mongoose.Schema(
    {
        title: {
            type: String, require: true, max:80, min:3
        },
        name: {
            type: String, require: true, max:20, min:3
        },
        creator: { type: Schema.Types.ObjectID, ref: 'user' },
        subscribers: [{type: Schema.Types.ObjectID, ref: 'user'}]
    }
)

export default mongoose.model('chat', chatSchema)