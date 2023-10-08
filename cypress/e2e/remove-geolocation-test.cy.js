describe('Verify that the user can add / remove new geographical locations.', () => {

    it('Verify that the user can remove new geographical locations.', () => {

        cy.visit('http://localhost:3000/weather/settings');
        cy.get('span').contains('Porto');
        cy.get('[aria-label="Remove Porto"]').click();
        cy.get('span').contains('Porto').should('not.exist');
    })

})

