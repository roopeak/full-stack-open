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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Arto Hellas',
        username: 'ahellas',
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

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('Example title')
      await page.getByTestId('author').fill('Example author')
      await page.getByTestId('url').fill('www.example.com')

      await page.getByRole('button', { name: 'create' }).click()
      const blogElement = await page.getByTestId('blog-title').nth(0)
      await expect(blogElement).toBeVisible()
      await expect(blogElement).toHaveText('Example titleview')
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).nth(0).click()

      await expect(page.getByText('like')).toBeVisible()
    })

    test('an user that added a blog can remove it', async ({ page }) => { 
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Remove blog Example title by Example author')
        await dialog.accept()
      })
      
      await page.getByRole('button', { name: 'view' }).nth(0).click()
      await expect(page.getByText('remove')).toBeVisible()

      await page.getByRole('button', { name: 'remove' }).click()
      
      const blogTitle = page.getByText('Example title')

      await expect(blogTitle).toHaveCount(0)
    })

    test.only('remove button shows only to user who added the blog', 
      async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()

        await page.getByTestId('title').fill('Example title')
        await page.getByTestId('author').fill('Example author')
        await page.getByTestId('url').fill('www.example.com')
  
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        
        const removeBtn = await page.getByRole('button', { name: 'remove'})
        await expect(removeBtn).toHaveCount(1)

        await page.getByRole('button', { name: 'logout'}).click()

        await loginWith(page, 'ahellas', 'salainen')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Arto Hellas logged in')).toBeVisible()
      
        await page.getByRole('button', { name: 'view' }).click()

        await expect(removeBtn).toHaveCount(0)
      }) 


  })
})