const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const mongoose = require('mongoose')

let token = ''

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  // Create a user
  const userResult = await api
    .post('/api/users')
    .send({
      username: 'testuser',
      name: 'Test User',
      password: 'password',
    })

  const user = userResult.body

  // Generate a token for the user
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  // Create a blog by the user
  const newBlog = {
    title: 'Test Blog',
    author: 'Test User',
    url: 'http://testblog.com',
    likes: 0,
    user: user.id,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)  // Expect a 201 status for creation
    .expect('Content-Type', /application\/json/)
})

test('blog creation fails without a token', async () => {
  const newBlog = {
    title: 'Another Test Blog',
    author: 'Test User',
    url: 'http://anothertestblog.com',
    likes: 0,
  }

  // Try to create a blog without a token
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401) // Unauthorized
})

test('blog creation succeeds with a valid token', async () => {
  const newBlog = {
    title: 'Another Test Blog',
    author: 'Test User',
    url: 'http://anothertestblog.com',
    likes: 0,
  }

  // Try to create a blog with a valid token
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201) // Expect a 201 status for creation
    .expect('Content-Type', /application\/json/)

  // Check the blog was actually created
  const blogs = await helper.blogsInDb()
  const titles = blogs.map(b => b.title)
  expect(titles).toContain('Another Test Blog')
})

// other tests...

afterAll(async () => {
  await mongoose.connection.close()
})
