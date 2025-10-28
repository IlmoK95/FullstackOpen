const blogsRouter = require('express').Router()
const { request } = require('http')
const Blog = require('../models/blog')
const { response } = require('../app')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')


blogsRouter.get('/', async (req, res) =>{

    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
    
})

blogsRouter.delete('/:id', async (req, res) => {

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()

})


blogsRouter.put('/:id', async (req, res) => {
    
    
    const blog = await Blog.findById(req.params.id)
 

    if (blog){

        const EditedBlog = req.body
        
        console.log(req.body)

        await Blog.findByIdAndUpdate(req.params.id, EditedBlog, { new: true})
        res.json()
    }else{
        res.status(404).end()
    }
    
})

blogsRouter.post('/',  async (req, res) => {

    const body_copy = req.body
    logger.info(body_copy)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    logger.info(decodedToken)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({...body_copy, user: user._id, likes: body_copy.likes || 0})

    if (blog.title!==null && blog.url!==null){

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      res.status(201).json(savedBlog)

    }else{
        res.statusCode(400).end
    }

})

module.exports = blogsRouter