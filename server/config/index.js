const { CORS } = require("./cors.config.js")
const { connectDB } = require("./db.config.js")

module.exports = { CORS, connectDB }