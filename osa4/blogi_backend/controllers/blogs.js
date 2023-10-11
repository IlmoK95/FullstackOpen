const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) =>{

    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

blogsRouter.post('/', (req, res) => {

    const body_copy = {...req.body}
    const blog = new Blog({...body_copy, likes: body_copy.likes || 0})

    blog
        .save()
        .then(result =>{
            res.status(201).json(result)
        })
})

module.exports = blogsRouter