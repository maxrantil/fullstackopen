import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs =>
        setBlogs(initialBlogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      returnedBlog.user = user;  // Manually add the user object to the blog post
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('blog could not be created');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const likeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id);
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };
    const returnedBlog = await blogService.update(id, updatedBlog);
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog));
  }


  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} messageType={'error'} />
      <Notification message={successMessage} messageType={'success'} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <Logout /></p>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
        )}
      </div>
      }
    </div>
  )
}

export default App
