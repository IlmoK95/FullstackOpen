const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) =>{
    const {username, name, password} = req.body

    if (password.length < 3){
      return res.status(400).json({error : 'password should be at least 3 characters long'})
    } 
    const isuser = await User.findOne({username})

    if (isuser!==null){
        return res.status(400).json({error : 'Username already taken'})
    }

    const saltRounds = 10
    console.log('starting encryption...')
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log('password encrypted')

    const user = new User({
        username,
        name,
        passwordHash,
      })
    
      const savedUser = await user.save()

    res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

module.exports = usersRouter