function mockLocation(latitude, longitude) {
    return {
        onBeforeLoad(win) {
            cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
                if (latitude && longitude) {
                    return cb({ coords: { latitude, longitude } });
                }
                throw err({ code: 1 });
            });
        }
    };
}

describe('Mock Geolocation Tests.', () => {
    it('Mock a location and validate the current weather, temperature, sunrise, and sunset times.', () => {
        cy.visit('http://localhost:3000/weather', mockLocation(51.509865, -0.118092));
        cy.get('div').contains('London').click();
        cy.get('[aria-label="Conditions"]').should('not.be.empty');
        cy.get('[aria-label="Current temperature"]').should('not.be.empty');
        cy.get('span').contains('Sunrise').next().should('not.be.empty');
        cy.get('span').contains('Sunset').next().should('not.be.empty');
        cy.get('span').contains('Humidity').next().should('not.be.empty');
        cy.get('span').contains('Visibility').next().should('not.be.empty');
    })


})