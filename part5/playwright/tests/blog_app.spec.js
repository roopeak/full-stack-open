const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await loginWith(page, 'mluukkai', 'salainen')
      await page.getByRole('button', { name: 'login' }).click()
      
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await loginWith(page, 'mluukkai', 'wrong')
      await page.getByRole('button', { name: 'login' }).click()
      
      await expect(page.getByText('wrong username or password')).toBeVisible()
  
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('Example title')
      await page.getByTestId('author').fill('Example author')
      await page.getByTestId('url').fill('www.example.com')
      await page.getByRole('button', { name: 'create '}).click()

      await expect(page.getByText('Example title')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('Example title')
      await page.getByTestId('author').fill('Example author')
      await page.getByTestId('url').fill('www.example.com')

      await page.getByRole('button', { name: 'create'}).click()
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByText('like')).toBeVisible()
    })
  })
})