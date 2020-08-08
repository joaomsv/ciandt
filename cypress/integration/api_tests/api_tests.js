/// <reference types="cypress" />

import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps'

When('I request a {string} from the host {string} with the body {string}', (Method, Host, Body) => {
  cy.request(Method, Host, Body).as('api')
})

Then('all users should have a name, username, and email', () => {
  cy.get('@api').then((response) => {
    response.body.forEach((element) => {
      expect(element.name).not.empty
      expect(element.username).not.empty
      expect(element.email).not.empty
    })
  })
})

Then('their Email should be valid', () => {
  cy.get('@api').then((response) => {
    response.body.forEach((element) => {
      cy.validateEmail(element.email).should('be.true')
    })
  })
})

Then('their Company catchphrase should have less than 50 characters', () => {
  cy.get('@api').then((response) => {
    response.body.forEach((element) => {
      expect(element.company.catchPhrase).to.be.length.of.below(50)
    })
  })
})

When('I request a POST with GET user id', () => {
  cy.request('GET', 'https://jsonplaceholder.typicode.com/users').as('getId')
})

Then('the post should be saved successfully', () => {
  cy.get('@getId').then((response) => {
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
})

Then('the post should not be saved successfully', () => {
  cy.get('@api').then((response) => {
    expect(response.status).to.be.eq(400)
  })
})
