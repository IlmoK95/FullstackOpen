
const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const CORS = require('cors')
const blogsRouter = require('./controllers/blogs')
const midWare = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGO_DB_URL)

mongoose.connect(config.MONGO_DB_URL)
    .then(()=>{
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error('connection error to MongoDB:', error.message)
    })


app.use(CORS())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


module.exports = app