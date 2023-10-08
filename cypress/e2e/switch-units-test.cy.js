describe('Swith Units Tests.', () => {

    it('Verify that the user can switch the preferred units', () => {

        cy.visit('http://localhost:3000/weather/settings');
        cy.get('h1').contains('Settings');
        cy.get('button').contains('Imperial').click();
        cy.get('button').contains('Imperial').should('contain', '✅');
        cy.get('button').contains('Metric').click();
        cy.get('button').contains('Metric').should('contain', '✅');
    })
})