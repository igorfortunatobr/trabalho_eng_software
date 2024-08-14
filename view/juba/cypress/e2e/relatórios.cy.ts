describe('Relatórios', () => {
  beforeEach(() => {

    cy.verificaRegistro();
    cy.realizaLogin();

    // Definir interceptação para mockar a resposta das categorias
    cy.intercept('GET', '/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nome: 'Alimentação' },
        { id: 2, nome: 'Transporte' },
      ],
    }).as('getCategorias');

    // Definir interceptação para mockar a geração do relatório
    cy.intercept('POST', '/relatorio?tipo=*', {
      statusCode: 200,
      body: 'Relatório PDF gerado com sucesso',
    }).as('postRelatorio');

    // Visitar a página de relatórios
    cy.visit('/relatorios');
  });

  it('Deve carregar a tela de relatórios com categorias e permitir a geração de relatório de transações', () => {
    // Verifica se as categorias foram carregadas
    cy.wait('@getCategorias');
    cy.get('#tipoRelatorio').should('have.value', 'transacoes');

    // Seleciona o tipo de relatório "Transação por Categoria"
    cy.get('#tipoRelatorio').select('Transação por Categoria');

    // Verifica se o dropdown de categorias é mostrado
    cy.get('#idCategoria').should('be.visible').select('Alimentação');

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('idCategoria', '1');
    });

    cy.get('@postRelatorio').then((interception) => {
      // Verifica se o download do PDF foi acionado
      expect(interception.response.body).to.equal('Relatório PDF gerado com sucesso');
    });
  });

  it('Deve permitir a geração de relatório de despesas', () => {
    // Verifica se o tipo de transação "Despesas" está selecionado por padrão
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('#despesas').should('be.checked');

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('tipoTransacao', '1');
    });
  });

  it('Deve permitir a geração de relatório de receitas', () => {
    // Seleciona o tipo de transação "Receitas"
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('#receitas').check();

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('tipoTransacao', '2');
    });
  });
   it('Deve abrir o relatório em uma nova aba ao gerar o relatório', () => {
    // Configurar um stub para o window.open
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Selecionar tipo de relatório e gerar relatório
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('response.statusCode').should('eq', 200);

    // Verifica se a nova aba foi aberta
    cy.get('@windowOpen').should('be.called');
  });
});
