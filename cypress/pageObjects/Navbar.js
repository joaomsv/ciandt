class Navbar {
  getLoginBtn() {
    return cy.get('.login')
  }

  getLogoutBtn() {
    return cy.get('.logout')
  }

  getAccountBtn(){
      return cy.get('.account')
  }

  getContactUsBtn(){
      return cy.get('#contact-link')
  }
}

export default Navbar
