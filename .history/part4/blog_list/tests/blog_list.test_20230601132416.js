const helper = require('./test_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.listWithMultipleBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

beforeAll(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.listWithMultipleBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('Blog list tests, step1', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.listWithMultipleBlogs.length)
  })

})

describe('Blog list tests, step2', () => {
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('Blog list tests, step3', () => {
  test('creation of a new blog', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      url: 'https://jest.com/async-await',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'Async/Await simplifies making async JS code'
    )
  })
})

describe('Blog list tests, step4', () => {
  test('if likes property is missing, it will default to 0', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      url: 'https://jest.com/async-await'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})

describe('Blog list tests, step5', () => {
  test('if title is missing, responds with status code 400', async () => {
    const newBlog = {
      author: 'Jest Author',
      url: 'https://jest.com/async-await',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if url is missing, responds with status code 400', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('Blog list expansions, step1', () => {
  test('deletion of a note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.listWithMultipleBlogs.length - 1
    )

    const id = blogsAtEnd.map(r => r.id)

    expect(id).not.toContain(blogToDelete.id)

  })
})

describe('Blog list expansions, step2', () => {
  test('updating a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLikes = {
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length)

    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  try {
    await mongoose.connection.close()
  } catch (error) {
    console.error('Failed to close connection', error)
  }
})
