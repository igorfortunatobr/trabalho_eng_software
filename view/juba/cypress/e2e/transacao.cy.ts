describe('TransacaoCRUD', () => {
  beforeEach(() => {
    cy.loginAndSetSession();

    cy.intercept('GET', '/transacoes/all', {
      fixture: 'transacoes.json',
    }).as('getTransacoes');

    cy.intercept('GET', '/categorias/all', {
      fixture: 'categorias.json',
    }).as('getCategorias');

    cy.visit('/transacoes');
    cy.wait('@getTransacoes');
    cy.wait('@getCategorias');
  });

  it('Deve carregar a página de transações corretamente', () => {
    cy.contains('Listagem de Transações').should('be.visible');
    cy.get('button').contains('Nova Transação').should('be.visible');
  });

  // Outros testes continuam...
});