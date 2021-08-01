import jwt from 'jsonwebtoken'

import User from '../models/user.model'
import options from '../config'
import { registerValidation } from '../validators/registerValidator'

export const loginController = async (req, res) => {
    try {
        const { login, password } = req.body
        const user = await User.findAndValidateUser({ login, password })
        user.password = ''
        console.log(`user logged in: ${user.login}`)
        const token = generateToken(user)
        return res.status(200).json({ message: 'User Successfully Logged In', user, token })
        
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}

export const registerController = async (req, res) => {
    try{
        const { login, password } = req.body
        const { error } = registerValidation({ login, password })
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const doesUserExist = await User.exists({login})
        if(doesUserExist) {
            return res.status(400).send({ message: 'This Login Already Exists' })
        }
        const user = new User({ login, password })
        await user.save()
        console.log(`new user registered: ${user.login}`)
        user.password = ''
        const token = generateToken(user)
        return res.status(200).json({ message: 'User Successfully Registered', user, token })

    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}

const generateToken = (user) => {
    const payload = {_id: user._id}
    const token = jwt.sign(payload, options.jwtSecret, { expiresIn: '48h'})
    return token 
}