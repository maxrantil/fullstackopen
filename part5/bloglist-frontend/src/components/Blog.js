import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={() => likeBlog(blog.id)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {/* <p><button>remove</button></p> */}
        </div>
      )}
    </div>
  )
}

export default Blog