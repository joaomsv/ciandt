class AuthenticationPage {
  getLoginEmailField() {
    return cy.get('#email')
  }

  getLoginPasswordField() {
    return cy.get('#passwd')
  }

  getLoginSubmitBtn() {
    return cy.get('#SubmitLogin')
  }

  Login(email, password) {
    this.getLoginEmailField().type(email)
    this.getLoginPasswordField().type(password)
    this.getLoginSubmitBtn().click()
  }
}

export default AuthenticationPage
