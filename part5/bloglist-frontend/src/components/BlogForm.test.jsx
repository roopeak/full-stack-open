import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls handleSubmit with correct details when a new blog is created', async () => {
  const handleSubmit = vi.fn()
  const handleTitleChange = vi.fn()
  const handleAuthorChange = vi.fn()
  const handleUrlChange = vi.fn()

  render(
    <BlogForm
      handleSubmit={handleSubmit}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
      title='Testing React forms'
      author='Test Author'
      url='www.test.com'
    />
  )

  const user = userEvent.setup()

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  expect(handleSubmit.mock.calls[0][0]).toBeDefined()
})