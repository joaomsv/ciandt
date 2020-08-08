class MyAccountPage {
  getPageHeader() {
    return cy.get('.page-heading')
  }

  getMyPersonalInfoBtn() {
    return cy.get('.icon-user')
  }

  getMyAddressesBtn() {
    return cy.get('.icon-building')
  }
}

export default MyAccountPage
