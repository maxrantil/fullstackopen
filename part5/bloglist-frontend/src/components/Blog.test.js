import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
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
    render(<Blog blog={blog} user={user} />)
  })

  test('renders title and author, but not url or likes by default', () => {
    expect(screen.getByText('Test blog')).toBeDefined()
    expect(screen.getByText('Test author')).toBeDefined()

    const urlElement = screen.queryByText('http://test.com')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('likes 5')
    expect(likesElement).toBeNull()
  })
})
