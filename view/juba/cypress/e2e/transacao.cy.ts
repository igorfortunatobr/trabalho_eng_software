describe('TransacaoCRUD', () => {
  
    beforeEach(() => {
        cy.verificaRegistro();
        cy.realizaLogin();

        cy.visit('/transacoes');
    });

    it('Deve carregar a página de transações corretamente', () => {
        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 1');
        const currentDate = new Date().toISOString().split('T')[0];
        cy.get('input#data').type(currentDate);
        cy.get('input#despesa').check();
        // Adicionar uma categoria
        cy.get('select#novaCategoria').then($select => {
            const options = $select.find('option');
            cy.wrap($select).select(options.eq(2).val());
        });
        cy.get('input#novaCategoria').type('20.00');
        cy.get('button').contains('Adicionar Categoria').click();
        
        // Adicionar outra categoria
        cy.get('select#novaCategoria').then($select => {
            const options = $select.find('option');
            cy.wrap($select).select(options.eq(3).val());
        });
        cy.get('input#novaCategoria').type('50.00');
        cy.get('button').contains('Adicionar Categoria').click();

        cy.get('button').contains('Salvar').click();
        cy.contains('Transação Teste 1').should('be.visible');
        cy.get('card').contains('R$ 70,00').should('be.visible');
    });

});