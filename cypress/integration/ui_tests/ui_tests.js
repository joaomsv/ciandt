/// <reference types="cypress" />

import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps'
import AuthenticationPage from '../../pageObjects/AuthenticationPage'
import Navbar from '../../pageObjects/Navbar'
import MyAccountPage from '../../pageObjects/MyAccountPage'
import YourPersonalInfoPage from '../../pageObjects/YourPersonalInfoPage'
import ContactUsPage from '../../pageObjects/ContactUsPage'
import SearchResultsPage from '../../pageObjects/SearchResultsPage'
import MyAddressesPage from '../../pageObjects/MyAddressesPage'
import CartPage from '../../pageObjects/CartPage'

const authenticationPage = new AuthenticationPage()
const navbar = new Navbar()
const myAccountPage = new MyAccountPage()
const yourPersonalInfoPage = new YourPersonalInfoPage()
const contactUsPage = new ContactUsPage()
const searchResultsPage = new SearchResultsPage()
const myAddressesPage = new MyAddressesPage()
const cartPage = new CartPage()

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
  yourPersonalInfoPage.ChangePassword(oldPsw, newPsw)
})

Then('the system should display the message {string}', (msg) => {
  yourPersonalInfoPage.getAlert().should('contain', msg)
})

When('I access the Contact Us page', () => {
  navbar.getContactUsBtn().click()
})

When('fill in the following information:', (datatable) => {
  datatable.hashes().forEach((row) => {
    contactUsPage.SendMessage(row.subjectHeading, row.Email, row.orderReference, row.Message)
  })
})

When('I search for a {string}', (item) => {
  navbar.SearchForItem(item)
})

When('add the first item to my wishlist', () => {
  searchResultsPage.getResultsBlock().first().find('.wishlist').click()
})

Then('the system should display an alert with the message {string}', (msg) => {
  searchResultsPage.getAlert().should('contain', msg)
})

When('choose 2 itens to compare', () => {
  cy.route('GET', '/*').as('addWait')
  searchResultsPage.getResultsBlock().each(($el, index, $list) => {
    if (index < 2) {
      searchResultsPage.getResultsBlock().eq(index).find('.compare').click()
      cy.wait('@addWait')
    }
  })
})

Then('the 2 chosen items should be displayed in the product comparison page', () => {
  searchResultsPage.getCompareBtn().first().click()
  searchResultsPage.getResultsBlock().should('have.length', 2)
})

When('add item to cart', () => {
  searchResultsPage.getResultsBlock().first().find('[title="Add to cart"]').click()
})

Then("a modal should appear with the item's information", () => {
  searchResultsPage.getCartModal().should('be.visible')
})

Then('the modal should display the message {string}', (msg) => {
  searchResultsPage.getCartModalHeader().should('contain', msg)
})

Given('no Work address exists', () => {
  myAccountPage.getMyAddressesBtn().click()
  myAddressesPage.getAddressBlock().each(($el, index, $list) => {
    if ($el.find('.page-subheading').text() == 'Work') {
      myAddressesPage.getAddressBlock().eq(index).find('[title="Delete"]').click()
    }
  })
})

When('I access my addresses', () => {
  navbar.getAccountBtn().click()
  myAccountPage.getMyAddressesBtn().click()
})

When('add a new address with the following information:', (datatable) => {
  myAddressesPage.getAddAddressBtn().click()
  datatable.hashes().forEach((row) => {
    myAddressesPage.SaveAddress(
      row.firstName,
      row.lastName,
      row.Address,
      row.City,
      row.State,
      row.postalCode,
      row.mobilePhone,
      row.addressTitle
    )
  })
})

Then('the new address should be successfully added to the my addresses page', () => {
  myAddressesPage.getAddressBlock().each(($el, index, $list) => {
    if ($el.find('.page-subheading').text() == 'Work') {
      myAddressesPage.getAddressBlock().eq(index).find('.page-subheading').should('contain', 'Work')
    }
  })
})

When('I proceed to checkout', () => {
  searchResultsPage.getCheckoutModalBtn().click()
})

When('finalize the purchase', () => {
  cartPage.FinalizePurchase()
})

Then('the purchase should be successfully completed', () => {
  cartPage.getOrderMsgHeader().should('contain', 'Your order on My Store is complete.')
})
