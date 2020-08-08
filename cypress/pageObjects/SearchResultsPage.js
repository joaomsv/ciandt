class SearchResultsPage {
  getResultsBlock() {
    return cy.get('.ajax_block_product')
  }

  getAlert() {
    return cy.get('.fancybox-error')
  }

  getCompareBtn() {
    return cy.get('.compare-form')
  }

  getCartModal() {
    return cy.get('#layer_cart')
  }

  getCheckoutModalBtn() {
    return cy.get('[title="Proceed to checkout"]')
  }

  getCartModalHeader() {
    return cy.get('#layer_cart').find('.layer_cart_product h2')
  }
}

export default SearchResultsPage
