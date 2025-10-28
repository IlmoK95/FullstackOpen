const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const express = require('express')
require('express-async-errors')
const app = express()
const CORS = require('cors')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const midWare = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
    .then(()=>{
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error('connection error to MongoDB:', error.message)
    })

app.use(midWare.getTokenExtraction)
app.use(CORS())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


module.exports = app