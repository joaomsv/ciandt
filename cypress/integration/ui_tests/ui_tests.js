/// <reference types="cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I visit {string} site', (site) => {
  cy.visit(site)
})

Given('no user has signed in', () => {
  cy.get('.login').should('exist')
})

When('request to sign in with the following information:', (datatable) => {
  cy.get('.login').click()
  datatable.hashes().forEach((row) => {
    cy.get('#email').type(row.Email)
    cy.get('#passwd').type(row.Password)
    cy.get('#SubmitLogin').click()
  })
})

Then('the user should be successfully signed in', () => {
  expect(Cypress.$('.account')).to.contain('Joao Vieira')
})

Then('be redirected to the My Account screen', () => {
  cy.get('.page-heading').should('contain', 'My account')
})

Given('I have signed in', (datatable) => {
  cy.get('.login').click()
  datatable.hashes().forEach((row) => {
    cy.get('#email').type(row.Email)
    cy.get('#passwd').type(row.Password)
    cy.get('#SubmitLogin').click()
  })
})

When('request to sign out', () => {
    cy.get('.logout').click()
})

Then('the user should be successfully signed out', () => {
    expect(Cypress.$('.login')).to.exist
})
