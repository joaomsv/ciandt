/// <reference types="cypress" />

describe('api tests', () => {
  // Cypress.config('baseUrl', 'https://jsonplaceholder.typicode.com')

  it.skip('GET api test', () => {
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
    cy.request({ method: 'GET', url: 'https://jsonplaceholder.typicode.com/users/' }).then((response) => {
      response.body.forEach((element) => {
        expect(element.name).not.empty
        expect(element.username).not.empty
        expect(element.email).not.empty
        // cy.validateEmail(element.email).should('be.true')
        expect(validateEmail(element.email)).to.be.true
        expect(element.company.catchPhrase).to.be.length.of.below(50)
      })
    })
  })

  it('POST api test', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users').then((response) => {
      response.body.forEach((user) => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
          userId: user.id,
          title: 'test title',
          body: 'test body'
        }).then((response) => {
          expect(response.status).to.be.eq(201)
        })
      })
    })
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', { userId: 1, body: 'test body' }).then(
      (response) => {
        expect(response.status).to.be.eq(400)
      }
    )
  })
})
