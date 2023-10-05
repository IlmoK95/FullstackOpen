const mongoose = require('mongoose')
const superttest = require('supertest')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

TextDecoderStream('Blogs are returned as json', async () =>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

afterAll(async ()=>{
    await mongoose.connection.close()
})