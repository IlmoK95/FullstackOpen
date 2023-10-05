require('dotenv').config()


const MONGO_DB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {MONGO_DB_URL, PORT}