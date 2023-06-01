const listHelper = require('../utils/for_testing')
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



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has no blogs, equals zero', () => {
    const result = listHelper.totalLikes(helper.listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the sum of likes of those', () => {
    const result = listHelper.totalLikes(helper.listWithMultipleBlogs)
    expect(result).toBe(36)
  })

})

describe('favorite blog', () => {

  test('when list has no blogs, equals null', () => {
    const result = listHelper.favoriteBlog(helper.listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    const expected = {
      title: helper.listWithOneBlog[0].title,
      author: helper.listWithOneBlog[0].author,
      likes: helper.listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })


  test('when list has multiple blogs, equals the blog with most likes', () => {
    const result = listHelper.favoriteBlog(helper.listWithMultipleBlogs)
    const expected = {
      title: helper.listWithMultipleBlogs[2].title,
      author: helper.listWithMultipleBlogs[2].author,
      likes: helper.listWithMultipleBlogs[2].likes,
    }
    expect(result).toEqual(expected)
  })

})

describe('most blogs', () => {

  test('when list has no blogs, equals null', () => {
    const result = listHelper.mostBlogs(helper.listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    const expected = {
      author: helper.listWithOneBlog[0].author,
      blogs: 1,
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs with different authors, equals the author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.listWithMultipleBlogs)
    const expected = {
      author: helper.listWithMultipleBlogs[3].author,
      blogs: 3,
    }
    expect(result).toEqual(expected)
  })

})

describe('most likes', () => {

  test('when list has no blogs, equals null', () => {
    const result = listHelper.mostLikes(helper.listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    const expected = {
      author: helper.listWithOneBlog[0].author,
      likes: helper.listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs with different authors, equals the author with most likes', () => {
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