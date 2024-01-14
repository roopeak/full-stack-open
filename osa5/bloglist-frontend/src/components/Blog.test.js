import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Hejsan',
    author: 'Sven',
    url: 'www.example.com',
    likes: 0,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  render(
    <Blog
      key={blog.id}
      blog={blog}
      user={blog.user}
      username={blog.user.username}
    />
  )

  const title = screen.getByText('Hejsan')

  expect(title).toBeDefined()
})

test('clicking like button calls event handler twice', async() => {
  const blog = {
    title: 'Hejsan',
    author: 'Sven',
    url: 'www.example.com',
    likes: 0,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const likeMockHandler = jest.fn()

  render(
    <Blog
      key={blog.id}
      blog={blog}
      user={blog.user}
      username={blog.user.username}
      updateLike={likeMockHandler}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})