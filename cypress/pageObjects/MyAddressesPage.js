class MyAddressesPage {
  getAddressBlock() {
    return cy.get('.col-xs-12.col-sm-6.address')
  }

  getAddAddressBtn() {
    return cy.get('[title="Add an address"]')
  }

  getFirstNameField() {
    return cy.get('#firstname')
  }

  getLastNameField() {
    return cy.get('#lastname')
  }

  getAddressField() {
    return cy.get('#address1')
  }

  getCityField() {
    return cy.get('#city')
  }

  getStateField() {
    return cy.get('#id_state')
  }

  getPostalCodeField() {
    return cy.get('#postcode')
  }

  getMobilePhoneField() {
    return cy.get('#phone_mobile')
  }

  getAliasField() {
    return cy.get('#alias')
  }

  getSaveBtn() {
    return cy.get('#submitAddress')
  }

  SaveAddress(firstName, lastName, address, city, state, postalCode, mobilePhone, alias) {
    this.getFirstNameField().clear().type(firstName)
    this.getLastNameField().clear().type(lastName)
    this.getAddressField().type(address)
    this.getCityField().type(city)
    this.getStateField().select(state)
    this.getPostalCodeField().type(postalCode)
    this.getMobilePhoneField().type(mobilePhone)
    this.getAliasField().clear().type(alias)
    this.getSaveBtn().click()
  }
}

export default MyAddressesPage
