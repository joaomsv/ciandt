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

Then('their Email must be valid', () => {
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  cy.get('@api').then((response) => {
    response.body.forEach((element) => {
      expect(validateEmail(element.email)).to.be.true
    })
  })
})

Then('their Company catchphrase must have less than 50 characters', () => {
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
