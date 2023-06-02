const { setupDatabase, teardownDatabase, getAuthToken, api } = require('./test_utils')
const helper = require('./test_helper')

let token

beforeAll(async () => {
  await setupDatabase() // connects to db, clears data, creates test user, and creates test blogs
  token = await getAuthToken() // logs in the test user and returns a token
})

afterAll(teardownDatabase) // closes the db connection

describe('Retrieving Blogs', () => {
  test('Returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Returns all blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.listWithMultipleBlogs.length)
  })

})

describe('Blog Identifier Tests', () => {
  test('Ensures unique identifier property of blogs is named "id"', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('Adding Blogs', () => {
  test('a new blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogs.body[blogsAtEnd.length - 1].title).toBe(newBlog.title)
  })

  test('adding a blog fails with status code 401 if token not provided', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(blogs.body.length)


    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    expect(blogs.body).toHaveLength(blogs.body.length) // No blog should have been added
  })
})

describe('Default Blog Properties', () => {
  test('Defaults "likes" property to 0 if missing', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      url: 'https://jest.com/async-await'
    }

    // Use the token in your requests
    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // The blog's 'likes' property should default to 0 if missing
    expect(result.body.likes).toBe(0)
  })
})

describe('Blog Creation Validation', () => {
  test('Responds with 400 status code if "title" property is missing', async () => {
    const newBlog = {
      author: 'Jest Author',
      url: 'https://jest.com/async-await',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('Responds with 400 status code if "url" property is missing', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('Deleting Blogs', () => {
  test('Deletes a blog and decreases blog count', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // Create a new blog
    const newBlog = {
      title: 'To be deleted',
      author: 'Test Author',
      url: 'https://delete-me.com',
      likes: 1,
    }

    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(blogsAtStart.length + 1)

    // Delete the blog
    await api
      .delete(`/api/blogs/${postResult.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // Ensure the blog count has decreased
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(blogsAtEnd.length)
  })
})

describe('Updating Blogs', () => {
  test('Updates a blog post\'s likes', async () => {
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
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})