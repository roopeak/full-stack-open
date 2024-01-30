describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'mluukkai', password: 'salainen'
      })

      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'mluukkai', password: 'salainen'
      })

      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('a new author')
      cy.get('#blog-url').type('www.example.com')

      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })
  })

  describe('and several blogs exist', function () {
    beforeEach(function ()  {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'mluukkai', password: 'salainen'
      })

      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'roopekar', password: 'salasana'
      })

      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#blog-title').type('first blog')
      cy.get('#blog-author').type('a new author')
      cy.get('#blog-url').type('www.example.com')

      cy.get('#create-button').click()
    })

    it('one of those can be be liked', function () {
      cy.contains('view').click()
      cy.contains('first blog').parent().find('button')
        .should('contain', 'like')
    })

    it('one of those can be removed', function () {
      cy.contains('view').click()
      cy.contains('first blog').parent().find('button')
        .should('contain', 'remove')
    })

    it('remove button shows only to who created the blog', function () {
      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('#username').type('roopekar')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('first blog').parent().find('button')
        .should('not.contain', 'remove').wait(500)
    })

    it('blogs are sorted according to likes', function () {
      cy.get('#new-blog-button').click()
      cy.get('#blog-title').type('second blog')
      cy.get('#blog-author').type('a newest author')
      cy.get('#blog-url').type('www.example.com')

      cy.get('#create-button').click()
      cy.reload()

      cy.contains('second blog').parent().find('button').click()

      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'second blog')
    })
  })
})