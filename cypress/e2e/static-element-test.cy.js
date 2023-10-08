describe('Verify the static elements on the Weather App pages.', () => {

    it('Verify the static elements Dashboard page', () => {

        cy.visit('http://localhost:3000/weather');
        cy.get('#root').should('exist');
        cy.get('h1').contains('Dashboard');
        cy.get('a').invoke('attr', 'data-testid').should('eq', 'weather-card')
        cy.get('a').contains('Settings').click();
        cy.url().should('eq', 'http://localhost:3000/weather/settings');

    })

    it('Verify the static elements Settings page', () => {

        cy.visit('http://localhost:3000/weather/settings');
        cy.get('#root').should('exist');
        cy.get('h1').contains('Settings');
        cy.get('a').contains('Back to Dashboard');
        cy.get('h2').contains('Locations');
        cy.get('p').contains('Select the locations you want to see');
        cy.get('button').contains('Add new location');
        cy.get('h2').contains('Units');
        cy.get('p').contains('Select the unit system of your preference');
        cy.get('button').contains('Metric');
        cy.get('button').contains('Imperial');

    })

})