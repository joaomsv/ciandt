class SearchResultsPage {
    getResultsBlock(){
        return cy.get('.ajax_block_product')
    }

    getAlert(){
        return cy.get('.fancybox-error')
    }
}

export default SearchResultsPage
