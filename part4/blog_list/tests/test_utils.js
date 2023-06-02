const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

async function setupDatabase() {
  // Clear the database
  await User.deleteMany({})
  await Blog.deleteMany({})

  // Create a test user
  const passwordHash = await bcrypt.hash('test', 10)
  const testUser = new User({ username: 'test', passwordHash })
  await testUser.save()

  // Seed the test database with some blog data
  const blogObjects = helper.listWithMultipleBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}

async function teardownDatabase() {
  await mongoose.connection.close()
}

async function getAuthToken() {
  // Log in the test user to get a token
  const response = await api
    .post('/api/login')
    .send({ username: 'test', password: 'test' })

  return response.body.token
}

module.exports = { setupDatabase, teardownDatabase, getAuthToken, api }