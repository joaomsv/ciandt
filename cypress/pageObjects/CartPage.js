class CartPage {
  getSummaryCheckoutBtn() {
    return cy.get('[title="Proceed to checkout"]:visible')
  }

  getAddressCheckoutBtn() {
    return cy.get('[name="processAddress"]')
  }

  getAgreeTermsBox() {
    return cy.get('#cgv')
  }

  getShippingCheckoutBtn() {
    return cy.get('[name="processCarrier"]')
  }

  getBankwirePaymentBtn() {
    return cy.get('.bankwire')
  }

  getConfirmOrderBtn() {
    return cy.get('.button.btn.btn-default.button-medium:visible')
  }

  FinalizePurchase() {
    this.getSummaryCheckoutBtn().click()
    this.getAddressCheckoutBtn().click()
    this.getAgreeTermsBox().check()
    this.getShippingCheckoutBtn().click()
    this.getBankwirePaymentBtn().click()
    this.getConfirmOrderBtn().click()
  }

  getOrderMsgHeader() {
    return cy.get('.cheque-indent')
  }
}

export default CartPage
