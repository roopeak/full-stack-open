import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing library',
    author: 'Testi Testaaja',
    url: 'www.testi.com',
    likes: 0,
  }

  render(<div>{blog.title}</div>)

  const title = screen.getByText(
    'Component testing is done with react-testing library')
  expect(title).toBeDefined()
})