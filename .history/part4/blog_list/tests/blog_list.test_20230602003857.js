// const helper = require('./test_helper')
// const supertest = require('supertest')
// const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const app = require('../app')
// const api = supertest(app)

// const Blog = require('../models/blog')

// beforeEach(async () => {
//   await Blog.deleteMany({})

//   const blogObjects = helper.listWithMultipleBlogs
//     .map(blog => new Blog(blog))
//   const promiseArray = blogObjects.map(blog => blog.save())
//   await Promise.all(promiseArray)
// })

// describe('Retrieving Blogs', () => {
//   test('Returns blogs as JSON', async () => {
//     await api
//       .get('/api/blogs')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   })

//   test('Returns all blogs', async () => {
//     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(helper.listWithMultipleBlogs.length)
//   })

// })

// describe('Blog Identifier Tests', () => {
//   test('Ensures unique identifier property of blogs is named "id"', async () => {
//     const response = await api.get('/api/blogs')
//     const blogs = response.body

//     blogs.forEach(blog => {
//       expect(blog.id).toBeDefined()
//     })
//   })
// })

// describe('Creating New Blogs', () => {
//   test('Creates new blog and increases blog count', async () => {
//     const newBlog = {
//       title: 'Async/Await simplifies making async JS code',
//       author: 'Jest Author',
//       url: 'https://jest.com/async-await',
//       likes: 5
//     }

//     // Create a user
//     const userResult = await api
//       .post('/api/users')
//       .send({
//         username: 'testuser',
//         name: 'Test User',
//         password: 'password',
//       })

//     const user = userResult.body

//     const userForToken = {
//       username: user.username,
//       id: user._id,
//     }
//     const token = jwt.sign(userForToken, process.env.SECRET)

//     // Use the token in your requests
//     await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(newBlog)
//       .expect(201)

//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length + 1)

//     const contents = blogsAtEnd.map(b => b.title)
//     expect(contents).toContain(
//       'Async/Await simplifies making async JS code'
//     )
//   })
// })

// describe('Default Blog Properties', () => {
//   test('Defaults "likes" property to 0 if missing', async () => {
//     const newBlog = {
//       title: 'Async/Await simplifies making async JS code',
//       author: 'Jest Author',
//       url: 'https://jest.com/async-await'
//     }

//     const userResult = await api
//       .post('/api/users')
//       .send({
//         username: 'testuser',
//         name: 'Test User',
//         password: 'password',
//       })

//     const user = userResult.body

//     const userForToken = {
//       username: user.username,
//       id: user._id,
//     }
//     const token = jwt.sign(userForToken, process.env.SECRET)

//     // Use the token in your requests
//     const result = await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(newBlog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     // The blog's 'likes' property should default to 0 if missing
//     expect(result.body.likes).toBe(0)
//   })
// })

// describe('Blog Creation Validation', () => {
//   let token = null

//   beforeAll(async () => {
//     const userResult = await api
//       .post('/api/users')
//       .send({
//         username: 'testuser',
//         name: 'Test User',
//         password: 'password',
//       })

//     console.log('userResult', userResult.body);

//     const user = userResult.body

//     const userForToken = {
//       username: user.username,
//       id: user._id,
//     }
//     token = jwt.sign(userForToken, process.env.SECRET)
//   })

//   test('Responds with 400 status code if "title" property is missing', async () => {
//     const newBlog = {
//       author: 'Jest Author',
//       url: 'https://jest.com/async-await',
//       likes: 5
//     }

//     await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(newBlog)
//       .expect(400)
//   })

//   test('Responds with 400 status code if "url" property is missing', async () => {
//     const newBlog = {
//       title: 'Async/Await simplifies making async JS code',
//       author: 'Jest Author',
//       likes: 5
//     }

//     await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(newBlog)
//       .expect(400)
//   })
// })


// describe('Deleting Blogs', () => {
//   test('Deletes a blog and decreases blog count', async () => {
//     // Create a user
//     const userResult = await api
//       .post('/api/users')
//       .send({
//         username: 'testuser',
//         name: 'Test User',
//         password: 'password',
//       })

//     const user = userResult.body

//     const userForToken = {
//       username: user.username,
//       id: user._id,
//     }
//     const token = jwt.sign(userForToken, process.env.SECRET)

//     // Create a new blog
//     const newBlog = {
//       title: 'To be deleted',
//       author: 'Test Author',
//       url: 'https://delete-me.com',
//       likes: 1,
//       user: user._id,
//     }

//     const postResult = await api
//       .post('/api/blogs')
//       .set('Authorization', `bearer ${token}`)
//       .send(newBlog)
//       .expect(201)

//     // Delete the blog
//     await api
//       .delete(`/api/blogs/${postResult.body.id}`)
//       .set('Authorization', `bearer ${token}`)
//       .expect(204)

//     // Ensure the blog count has decreased
//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length)
//   })
// })

// describe('Updating Blogs', () => {
//   test('Updates a blog post\'s likes', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToUpdate = blogsAtStart[0]

//     const newLikes = {
//       likes: blogToUpdate.likes + 1,
//     }

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send(newLikes)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     const blogsAtEnd = await helper.blogsInDb()

//     expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length)

//     const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
//     expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
//   })
// })

// afterAll(async () => {
//   try {
//     await mongoose.connection.close()
//   } catch (error) {
//     console.error('Failed to close connection', error)
//   }
// })
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Blog = require('../models/blog');

const api = supertest(app);

let token;

beforeEach(async () => {
  // Clear the database
  await User.deleteMany({});
  await Blog.deleteMany({});

  // Create a test user
  const passwordHash = await bcrypt.hash('test', 10);
  const testUser = new User({ username: 'test', passwordHash });
  await testUser.save();

  // Log in the test user to get a token
  const response = await api
    .post('/api/login')
    .send({ username: 'test', password: 'test' });

  token = response.body.token; // save the token for later use
});

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await api.get('/api/blogs');

  expect(blogs.body).toHaveLength(1);
  expect(blogs.body[0].title).toBe(newBlog.title);
});

test('adding a blog fails with status code 401 if token not provided', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401);

  const blogs = await api.get('/api/blogs');

  expect(blogs.body).toHaveLength(0); // No blog should have been added
});

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

describe('Creating New Blogs', () => {
  test('Creates new blog and increases blog count', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      url: 'https://jest.com/async-await',
      likes: 5
    }

    // Create a user
    const userResult = await api
      .post('/api/users')
      .send({
        username: 'testuser',
        name: 'Test User',
        password: 'password',
      })

    const user = userResult.body

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    // Use the token in your requests
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'Async/Await simplifies making async JS code'
    )
  })
})

describe('Default Blog Properties', () => {
  test('Defaults "likes" property to 0 if missing', async () => {
    const newBlog = {
      title: 'Async/Await simplifies making async JS code',
      author: 'Jest Author',
      url: 'https://jest.com/async-await'
    }

    const userResult = await api
      .post('/api/users')
      .send({
        username: 'testuser',
        name: 'Test User',
        password: 'password',
      })

    const user = userResult.body

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

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
  let token = null

  beforeAll(async () => {
    const userResult = await api
      .post('/api/users')
      .send({
        username: 'testuser',
        name: 'Test User',
        password: 'password',
      })

    console.log('userResult', userResult.body);

    const user = userResult.body

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)
  })

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
    // Create a user
    const userResult = await api
      .post('/api/users')
      .send({
        username: 'testuser',
        name: 'Test User',
        password: 'password',
      })

    const user = userResult.body

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    // Create a new blog
    const newBlog = {
      title: 'To be deleted',
      author: 'Test Author',
      url: 'https://delete-me.com',
      likes: 1,
      user: user._id,
    }

    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    // Delete the blog
    await api
      .delete(`/api/blogs/${postResult.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    // Ensure the blog count has decreased
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length)
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
