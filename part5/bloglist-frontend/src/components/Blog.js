import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogComponent'>
      <span className='blogTitle'>{blog.title}</span> <span className='blogAuthor'>{blog.author}</span>
      <button onClick={toggleDetails}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      {detailsVisible && (
        <div>
          <p className='blogUrl'>{blog.url}</p>
          <p>likes <span className='blogLikes'>{blog.likes}</span>
            <button onClick={() => likeBlog(blog.id)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {console.log('blog.user.username', blog.user.username)}
          {console.log('user.username', user.username)}
          {blog.user.username === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
