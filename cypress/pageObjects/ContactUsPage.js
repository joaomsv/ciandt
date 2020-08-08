class ContactUsPage {
  getSubjectHeadingField() {
    return cy.get('#id_contact')
  }

  getEmailField() {
    return cy.get('#email')
  }

  getOrderReferenceField() {
    return cy.get('#id_order')
  }

  getMessageField() {
    return cy.get('#message')
  }

  getSendBtn() {
    return cy.get('#submitMessage')
  }

  SendMessage(subjectHeading,email,orderReference,message) {
    this.getSubjectHeadingField().select(subjectHeading)
    this.getEmailField().type(email)
    this.getOrderReferenceField().type(orderReference)
    this.getMessageField().type(message)
    this.getSendBtn().click()
  }
}

export default ContactUsPage
