import jwt from 'jsonwebtoken'
import options from '../config'

const authMiddleware = (req, res, next) => {
    const bearerToken = req.headers.authorization.replace("Bearer ", "")

    if(!bearerToken) {
        return res.status(401).json({ error: 'Missing token' })
    }
    jwt.verify(bearerToken, options.jwtSecret, (err, user) => {
        if(err) {
            return res.status(401).json({ error: err })
        }
        req.user = user
    })
    next()
}

export default authMiddleware