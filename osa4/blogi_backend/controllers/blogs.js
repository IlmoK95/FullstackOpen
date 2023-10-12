const blogsRouter = require('express').Router()
const { request } = require('http')
const Blog = require('../models/blog')
const { response } = require('../app')

blogsRouter.get('/', (req, res) =>{

    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

blogsRouter.delete('/:id', async (req, res) => {

    await Blog.findBuIdAndRemove(req.params.id)
    response.status(204).end()

})


blogsRouter.put('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id)
    if (blog){
        console.log(req.body)
        const EditedBlog = {...blog, likes : req.body} 
        await Blog.findByIdAndUpdate(req.params.id, EditedBlog, { new: true})
        response.json()
    }else{
        response.status(404).end()
    }
    
})

blogsRouter.post('/', (req, res) => {


    const body_copy = {...req.body}
    const blog = new Blog({...body_copy, likes: body_copy.likes || 0})


    if (blog.title!==null && blog.url!==null){

        blog
        .save()
        .then(result =>{
            res.status(201).json(result)})

    }else{
        res.statusCode(400).end
    }

})

module.exports = blogsRouter