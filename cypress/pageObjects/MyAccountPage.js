class MyAccountPage {
  getPageHeader() {
    return cy.get('.page-heading')
  }

  getMyPersonalInfoBtn() {
    return cy.get('.icon-user')
  }
}

export default MyAccountPage
