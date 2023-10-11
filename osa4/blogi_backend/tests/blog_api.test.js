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

    test(' id-fields name is in right form', async () =>{

        const response = await api.get('/api/blogs')

        const keys = Object.keys(response.body[0])

        const id_Obj = response.body[0]
        const id_key = keys.pop()

        expect(id_key).toBe('id')

    })

    test(' succesfully posted a new blog', async ()=>{


        const response_1 = await api.get('/api/blogs')
        const res_len = response_1.body.length

        const NewPost = {_id: "5a422b3a1b54a676234d1234",
                        title:"Javascript basics",
                        author:"IlmoK",
                        url:'www.IlmoK.fi',
                        likes: 5,
                        __v:0
                    }

        await api.post('/api/blogs').send(NewPost)

        const response_2 = await api.get('/api/blogs')
        const res_len_2 = response_2.body.length

        expect(res_len_2).toBe(res_len + 1)


    })

    test.only(' 0 likes when no assigned value', async ()=>{

        const NewPost = {_id: "5a411b3a1b54a676234d1234",
        title:"Javascript testing",
        author:"IlmoK",
        url:'www.IlmoK.fi',
        likes: NaN,
        __v:0

        }

        await api.post('/api/blogs').send(NewPost)

        const blogs = await api.get('/api/blogs')

        blogs.body.forEach( blog =>{
            console.log(blog.likes)
            expect(blog.likes).not.toBe(null)
        })




    })

    
    
      
    afterAll(async ()=>{
        await mongoose.connection.close()
    })



})
