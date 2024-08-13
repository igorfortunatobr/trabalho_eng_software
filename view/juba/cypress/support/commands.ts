export {}; 

declare global {
  namespace Cypress {
    interface Chainable {
      loginAndSetSession(): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginAndSetSession', () => {
    cy.session('novo.usuario@example.com', () => {
        cy.intercept('POST', '/auth/login', {
            fixture: 'registro.json',
        }).as('postLogin');

        cy.visit('/login');
        cy.get('input#formBasicEmail').type('novo.usuario@example.com');
        cy.get('input#formBasicPassword').type('senha123');
        cy.get('button[type="submit"]').click();
        cy.wait('@postLogin');

        // Simula o armazenamento do token
        cy.window().then((win) => {
            win.localStorage.setItem('authToken', 'novo-fake-jwt-token');
        });
    });
});
