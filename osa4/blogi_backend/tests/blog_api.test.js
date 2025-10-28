const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
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

    test(' 0 likes when no assigned value', async ()=>{

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
            expect(blog.likes).not.toBe(null)
        })

    })


    test('  fields title and url', async()=>{

        const NewPost = {_id: "9a411b3a1b54a676234d1234",
        title:NaN,
        author:"IlmoK",
        url:NaN,
        likes: 3,
        __v:0
        }

        await api.post('/api/blogs').send(NewPost) 
        expect(400)


    })

    test(' can be deleted', async ()=>{

        const newBlog = {_id: "0a411b3a1b54a676234d1234",
        title:"Javascript testing",
        author:"IlmoK",
        url:'www.IlmoK.fi',
        likes: 9,
        __v:0
        }

        const newBlogID =newBlog._id
        const blog = new Blog(newBlog)
        await blog.save()

        await api.delete(`/api/blogs/${newBlogID}`)
        expect(204)


    })

    test(' can edit likes', async ()=>{
        const newLikes =  10
        const id = "0a411b3a1b54a676234d1234"
        await api.put(`/api/blogs/${id}`).send(String(newLikes))
        expect(200)

    })


    test(' don`t add users with same name', async ()=>{

        await User.deleteOne({userName : "Calle95"})
        const user = new User ({userName: "Calle95", name: "Kalle", password: "1234567"})

        await user.save()
        console.log('user saved')

        const testUser = {userName: "Calle95", name: "Kallu", password: "1234576"}

        await api.post('/api/users/').send(testUser)
        expect(400)
    })


    test.only(' don`t add users with too short password', async ()=>{

        const testUser = {userName: "newuser", name: "Kallu", password: "12"}
        await api.post('/api/users/').send(testUser)
        expect(400)

    })


        
    afterAll(async ()=>{
        console.log('MongoDB connection closed')
        await mongoose.connection.close()
    })


})
