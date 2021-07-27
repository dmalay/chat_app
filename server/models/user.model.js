import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)
  return next()
})

userSchema.method({
    passwordMatches(password) {
      return bcrypt.compareSync(password, this.password)
    }
  })
  
  userSchema.statics.findAndValidateUser = async function ({ login, password }) {
    if (!login) {
      throw new Error('No login')
    }
    if (!password) {
      throw new Error('No password')
    }
    const user = await this.findOne({ login }).exec()
    if (!user) {
      throw new Error('No User')
    }
    const isPasswordOk = await user.passwordMatches(password)
    if (!isPasswordOk) {
      throw new Error('Password Incorrect')
    }
    return user
  }

export default mongoose.model("users", userSchema)
