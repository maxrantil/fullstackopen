describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.createBlog({ title: 'a blog', author: 'created by cypress', url: 'cypress.io' })
      cy.contains('a blog created by cypress')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'a blog', author: 'created by cypress', url: 'cypress.io' })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({ title: 'a blog', author: 'created by cypress', url: 'cypress.io' })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })

    it('A blog cannot be deleted by another user', function() {
      cy.createBlog({ title: 'a blog', author: 'created by cypress', url: 'cypress.io' })
      cy.contains('view').click()
      cy.get('button:contains("remove")').should('exist')
      cy.contains('logout').click()
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, { name: 'another user', username: 'another', password: 'user' })
      cy.login({ username: 'another', password: 'user' })
      cy.contains('view').click()
      cy.get('button:contains("remove")').should('not.exist')
    })
  })
  describe('When several blogs exist', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'First blog', author: 'Author 1', url: 'http://example.com/1', likes: 5 })
      cy.createBlog({ title: 'Second blog', author: 'Author 2', url: 'http://example.com/2', likes: 10 })
      cy.createBlog({ title: 'Third blog', author: 'Author 3', url: 'http://example.com/3', likes: 15 })
    })

    it('Blogs are ordered according to likes', function() {
      cy.get('.blogComponent').eq(0).should('contain', 'Third blog')
      cy.get('.blogComponent').eq(1).should('contain', 'Second blog')
      cy.get('.blogComponent').eq(2).should('contain', 'First blog')
    })
  })
})