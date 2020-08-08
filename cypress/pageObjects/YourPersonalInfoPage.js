class YourPersonalInfoPage {
  getCurrentPasswordFIeld() {
    return cy.get('#old_passwd')
  }

  getNewPasswordField() {
    return cy.get('#passwd')
  }

  getNewPasswordConfirmationField() {
    return cy.get('#confirmation')
  }

  getSaveBtn() {
    return cy.get('[name=submitIdentity]')
  }

  ChangePassword(oldPassword, newPassword) {
    this.getCurrentPasswordFIeld().type(oldPassword)
    this.getNewPasswordField().type(newPassword)
    this.getNewPasswordConfirmationField().type(newPassword)
    this.getSaveBtn().click()
  }

  getAlert(){
      return cy.get('.alert')
  }
}

export default YourPersonalInfoPage
