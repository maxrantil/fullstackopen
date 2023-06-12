import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component
  const likeBlog = jest.fn()  // mock function

  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'http://test.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testuser'
    }
  }

  const user = {
    username: 'testuser'
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} likeBlog={likeBlog} />)
  })


  test('renders title and author, but not url or likes by default', () => {
    expect(component.getByText('Test blog')).toBeDefined()
    expect(component.getByText('Test author')).toBeDefined()

    const urlElement = component.queryByText('http://test.com')
    expect(urlElement).toBeNull()

    const likesElement = component.queryByText('likes 5')
    expect(likesElement).toBeNull()
  })

  test('renders url and likes when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const urlElement = component.getByText('http://test.com')
    expect(urlElement).toBeDefined()

    const likesLabel = component.getByText('likes')
    expect(likesLabel).toBeDefined()

    const likesCount = component.getByText('5')
    expect(likesCount).toBeDefined()
  })

  test('if like button is clicked twice, the event handler is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog).toHaveBeenCalledTimes(2)
  })
})
