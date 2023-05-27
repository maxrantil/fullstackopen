const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithNoBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('when list has no blogs, equals zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the sum of likes of those', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })

})

describe('favorite blog', () => {

  test('when list has no blogs, equals null', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })


  test('when list has multiple blogs, equals the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const expected = {
      title: listWithMultipleBlogs[2].title,
      author: listWithMultipleBlogs[2].author,
      likes: listWithMultipleBlogs[2].likes,
    }
    expect(result).toEqual(expected)
  })

})

describe('most blogs', () => {

  test('when list has no blogs, equals null', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = {
      author: listWithOneBlog[0].author,
      blogs: 1,
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs with different authors, equals the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    const expected = {
      author: listWithMultipleBlogs[3].author,
      blogs: 3,
    }
    expect(result).toEqual(expected)
  })

})

describe('most likes', () => {

  test('when list has no blogs, equals null', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })

  test('when list has multiple blogs with different authors, equals the author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    const expected = {
      author: listWithMultipleBlogs[1].author,
      likes: 17,
    }
    expect(result).toEqual(expected)
  })

})