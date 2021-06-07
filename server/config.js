import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config()

const options ={
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    app: process.env.APP,
    mongoURL: process.env.MONGO_URL
}

export default options
