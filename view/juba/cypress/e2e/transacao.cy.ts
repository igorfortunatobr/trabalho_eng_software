describe('TransacaoCRUD', () => {
  
    beforeEach(() => {
        cy.verificaRegistro();
        cy.realizaLogin();

        cy.visit('/transacoes');
    });

    it('Deve carregar a página de transações corretamente', () => {
        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').should('be.visible');
    });

});