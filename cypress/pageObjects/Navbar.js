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
}

export default Navbar
