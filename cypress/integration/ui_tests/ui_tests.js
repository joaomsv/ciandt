/// <reference types="cypress" />

import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps'
import AuthenticationPage from '../../pageObjects/AuthenticationPage'
import Navbar from '../../pageObjects/Navbar'
import MyAccountPage from '../../pageObjects/MyAccountPage'
import YourPersonalInfoPage from '../../pageObjects/YourPersonalInfoPage'
import ContactUsPage from '../../pageObjects/ContactUsPage'

const authenticationPage = new AuthenticationPage()
const navbar = new Navbar()
const myAccountPage = new MyAccountPage()
const yourPersonalInfoPage = new YourPersonalInfoPage()
const contactUsPage = new ContactUsPage()

Before(() => {
  cy.server()
})

Given('I visit {string} site', (site) => {
  cy.visit(site)
})

Given('no user has signed in', () => {
  navbar.getLoginBtn().should('exist')
})

When('request to sign in with the following information:', (datatable) => {
  navbar.getLoginBtn().click()
  datatable.hashes().forEach((row) => {
    authenticationPage.Login(row.Email, row.Password)
  })
})

Then('the user should be successfully signed in', () => {
  navbar.getAccountBtn().should('contain', 'Joao Vieira')
})

Then('be redirected to the My Account screen', () => {
  myAccountPage.getPageHeader().should('contain', 'My account')
})

Given('I have signed in', (datatable) => {
  navbar.getLoginBtn().click()
  datatable.hashes().forEach((row) => {
    authenticationPage.Login(row.Email, row.Password)
  })
})

When('request to sign out', () => {
  navbar.getLogoutBtn().click()
})

Then('the user should be successfully signed out', () => {
  navbar.getLogoutBtn().should('not.exist')
})

When('I access my personal information', () => {
  navbar.getAccountBtn().click()
  myAccountPage.getMyPersonalInfoBtn().click()
})

When('change my password from {string} to {string}', (oldPsw, newPsw) => {
  yourPersonalInfoPage.ChangePassword(oldPsw,newPsw)
})

Then('the system should display the message {string}', (msg) => {
  yourPersonalInfoPage.getAlert().should('contain', msg)
})

When('I access the Contact Us page', () => {
  navbar.getContactUsBtn().click()
})

When('fill in the following information:', (datatable) => {
  datatable.hashes().forEach((row) => {
    contactUsPage.SendMessage(row.subjectHeading,row.Email,row.orderReference,row.Message)
  })
})

When('I search for a {string}', (item) => {
  cy.get('#search_query_top').type(item)
  cy.get('#searchbox').find('.btn').click()
})

When('add the first item to my wishlist', () => {
  cy.get('.ajax_block_product').eq('0').find('.wishlist').click()
})

Then('the system should display an alert with the message {string}', (msg) => {
  cy.get('.fancybox-error').should('contain', msg)
})

When('choose 2 itens to compare', () => {
  cy.route('GET', '/*').as('addWait')
  cy.get('.ajax_block_product').each(($el, index, $list) => {
    if (index < 2) {
      cy.get('.ajax_block_product').eq(index).find('.compare').click()
      cy.wait('@addWait')
    }
  })
})

Then('the 2 chosen items should be displayed in the product comparison page', () => {
  cy.get('.compare-form').eq('0').click()
  cy.get('.ajax_block_product').should('have.length', 2)
})

When('add item to cart', () => {
  cy.get('.ajax_block_product').eq('0').find('[title="Add to cart"]').click()
})

Then("a modal should appear with the item's information", () => {
  cy.get('#layer_cart').should('be.visible')
})

Then('the modal should display the message {string}', (msg) => {
  cy.get('#layer_cart').find('.layer_cart_product h2').should('contain', msg)
})

Given('no Work address exists', () => {
  cy.get('.icon-building').click()
  cy.get('.col-xs-12.col-sm-6.address').each(($el, index, $list) => {
    if ($el.find('.page-subheading').text() == 'Work') {
      cy.get('.col-xs-12.col-sm-6.address').eq(index).find('[title="Delete"]').click()
    }
  })
})

When('I access my addresses', () => {
  cy.get('.account').click()
  cy.get('.icon-building').click()
})

When('add a new address with the following information:', (datatable) => {
  cy.get('[title="Add an address"]').click()
  datatable.hashes().forEach((row) => {
    cy.get('#firstname').clear().type(row.firstName)
    cy.get('#lastname').clear().type(row.lastName)
    cy.get('#address1').type(row.Address)
    cy.get('#city').type(row.City)
    cy.get('#id_state').select(row.State)
    cy.get('#postcode').type(row.postalCode)
    cy.get('#phone_mobile').type(row.mobilePhone)
    cy.get('#alias').clear().type(row.addressTitle)
    cy.get('#submitAddress').click()
  })
})

Then('the new address should be successfully added to the my addresses page', () => {
  cy.get('.col-xs-12.col-sm-6.address').each(($el, index, $list) => {
    if ($el.find('.page-subheading').text() == 'Work') {
      cy.get('.col-xs-12.col-sm-6.address').eq(index).find('.page-subheading').should('contain', 'Work')
    }
  })
})

When('I proceed to checkout', () => {
  cy.get('[title="Proceed to checkout"]').click()
})

When('finalize the purchase', () => {
  cy.get('[title="Proceed to checkout"]:visible').click()
  cy.get('[name="processAddress"]').click()
  cy.get('#cgv').check()
  cy.get('[name="processCarrier"]').click()
  cy.get('.bankwire').click()
  cy.get('.button.btn.btn-default.button-medium:visible').click()
})

Then('the purchase should be successfully completed', () => {
  cy.get('.cheque-indent').should('contain', 'Your order on My Store is complete.')
})
