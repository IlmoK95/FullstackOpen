const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const test_helper = require('./Likes.test')


describe.only('Blogs have', ()=>{

    beforeEach(async ()=>{
        await Blog.deleteMany({})
        const new_blog_1 = new Blog(test_helper.blogs[0]) 
        const new_blog_2 = new Blog(test_helper.blogs[1])
        await new_blog_1.save()
        await new_blog_2.save()
    })

    
    test(' Right amount', async () =>{
  
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })

    test(' right format (json)', async () =>{

        await api.get('/api/blogs')
                 .expect(200)
                 .expect('Content-type', /application\/json/)
    })

    test.only(' id-fields name is in right form', async () =>{

        const response = await api.get('/api/blogs')

        const keys = Object.keys(response.body[0])

        const id_Obj = response.body[0]
        const id_key = keys.pop()

        expect(id_key).toBe('id')

    })
    
      
    afterAll(async ()=>{
        await mongoose.connection.close()
    })



})
