require('dotenv').config()

let PORT= process.env.PORT
let MONGO_DB_URL = process.env.MONGO_DB_URL

module.exports = {MONGO_DB_URL, PORT}