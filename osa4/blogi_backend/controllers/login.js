const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body
    logger.info(`login attempt for user: ${username}, ${password}`)
    const user = await User.findOne({ username })
    logger.info(`found user: ${user}`)
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    logger.info(`password correct: ${passwordCorrect}`)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
 
})

module.exports = loginRouter

