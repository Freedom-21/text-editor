require("dotenv").config()

/**@defining constants from @environment variables */
const APP_NODE_ENV = process.env.NODE_ENV
const APP_PORT = process.env.PORT || 5000
const APP_DB_URI = process.env.DB_URI
const SECRET = process.env.SECRET
const APP_REDIS_HOST = process.env.REDIS_HOST
const APP_REDIS_PORT = process.env.REDIS_PORT
const APP_REDIS_PASSWORD = process.env.REDIS_PASSWORD


//export constants 
module.exports = {
    APP_DB_URI,
    APP_NODE_ENV,
    APP_PORT,
    APP_REDIS_HOST,
    APP_REDIS_PASSWORD,
    APP_REDIS_PORT,
    SECRET
}