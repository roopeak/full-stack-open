import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

test('renders content', () => {
  const blog = {
    title: 'Hejsan',
    author: 'Sven',
    url: 'www.example.com',
    likes: 0,
  }

  render(<div>{blog.title}</div>)

  const title = screen.getByText('Hejsan')

  expect(title).toBeDefined()
})