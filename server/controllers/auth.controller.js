import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import options from '../config'

export const loginController = async (req, res) => {
    try {
        const { login, password } = req.body
        const user = await User.findAndValidateUser({ login, password })
        const payload = {_id: user._id}
        console.log(user, 'payload',payload)
        const token = jwt.sign(payload, options.jwtSecret, { expiresIn: '48h'})
        return res.status(200).json({ status: 'ok', token })

    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}

export const registerController = async (req, res) => {
    try{
        const { login, password } = req.body
        const doesUserExist = await User.exists({login})
        if(doesUserExist) {
            return res.status(400).send('This Login Already Exists')
        }
        const newUser = new User({ login, password })
        await newUser.save()
        return res.status(200).json({ message: 'User successfully registered'})

    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}