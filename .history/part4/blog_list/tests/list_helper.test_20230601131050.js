const listHelper = require('../utils/for_testing')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const config = require('./utils/config')
// const app = require('../app')

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

const Blog = require('../models/blog')

async function createBlog(blogData) {
  const blog = new Blog(blogData)
  await blog.save()
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(helper.listWithMultipleBlogs.map(createBlog))
})


test('dummy function should return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Calculation of total likes', () => {

  test('should return zero when no blogs are present', () => {
    const result = listHelper.totalLikes(helper.listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('should return the number of likes when only one blog is present', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('should return the sum of likes when multiple blogs are present', () => {
    const result = listHelper.totalLikes(helper.listWithMultipleBlogs)
    expect(result).toBe(36)
  })

})

describe('Determination of favorite blog', () => {

  test('should return null when no blogs are present', () => {
    const result = listHelper.favoriteBlog(helper.listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('should return the only blog when one blog is present', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    const expected = {
      title: helper.listWithOneBlog[0].title,
      author: helper.listWithOneBlog[0].author,
      likes: helper.listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })


  test('should return the blog with most likes when multiple blogs are present', () => {
    const result = listHelper.favoriteBlog(helper.listWithMultipleBlogs)
    const expected = {
      title: helper.listWithMultipleBlogs[2].title,
      author: helper.listWithMultipleBlogs[2].author,
      likes: helper.listWithMultipleBlogs[2].likes,
    }
    expect(result).toEqual(expected)
  })

})

describe('Author with the most blogs', () => {

  test('should return null when no blogs are present', () => {
    const result = listHelper.mostBlogs(helper.listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('should return the author of the only blog when one blog is present', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    const expected = {
      author: helper.listWithOneBlog[0].author,
      blogs: 1,
    }
    expect(result).toEqual(expected)
  })

  test('should return the author with most blogs when multiple blogs are present', () => {
    const result = listHelper.mostBlogs(helper.listWithMultipleBlogs)
    const expected = {
      author: helper.listWithMultipleBlogs[3].author,
      blogs: 3,
    }
    expect(result).toEqual(expected)
  })

})

describe('Author with the most likes', () => {

  test('should return null when no blogs are present', () => {
    const result = listHelper.mostLikes(helper.listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('should return the author of the only blog when one blog is present', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    const expected = {
      author: helper.listWithOneBlog[0].author,
      likes: helper.listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })

  test('should return the author with most likes when multiple blogs are present', () => {
    const result = listHelper.mostLikes(helper.listWithMultipleBlogs)
    const expected = {
      author: helper.listWithMultipleBlogs[1].author,
      likes: 17,
    }
    expect(result).toEqual(expected)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})