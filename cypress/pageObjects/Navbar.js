class Navbar {
  getLoginBtn() {
    return cy.get('.login')
  }

  getLogoutBtn() {
    return cy.get('.logout')
  }

  getAccountBtn() {
    return cy.get('.account')
  }

  getContactUsBtn() {
    return cy.get('#contact-link')
  }

  getSearchBoxField() {
    return cy.get('#search_query_top')
  }

  getSearchBoxBtn() {
    return cy.get('#searchbox').find('.btn')
  }

  SearchForItem(item) {
    this.getSearchBoxField().type(item)
    this.getSearchBoxBtn().click()
  }
}

export default Navbar
