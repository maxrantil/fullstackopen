const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    }
  }

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const _ = require('lodash')

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }
  // First, we group the blogs by author using the lodash groupBy function
  const blogsByAuthor = _.groupBy(blogs, 'author')

  // Then, we map each author to an object that includes their name and number of blogs
  const authorCounts = _.map(blogsByAuthor, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }))

  // Finally, we find the author with the most blogs using the lodash maxBy function
  return _.maxBy(authorCounts, 'blogs')
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return null
  }
  const blogsByAuthor = _.groupBy(blogs, 'author')

  const authorLikes = _.map(blogsByAuthor, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))

  return _.maxBy(authorLikes, 'likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}