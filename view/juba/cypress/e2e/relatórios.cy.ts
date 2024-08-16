describe('Relatórios', () => {
  const categoriaArray: any[] = [];

  beforeEach(() => {

    cy.verificaRegistro();
    cy.realizaLogin()
    
    // Visitar a página de relatórios
    cy.visit('/relatorios');

    cy.intercept('POST', '/relatorio?tipo=*').as('postRelatorio');

    cy.intercept('GET', '/categorias/all').as('getCategorias');
  });

  it('Testar relatório de relatório de transações sem dados', () => {

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Verifica se as categorias foram carregadas
    cy.get('#tipoRelatorio').should('have.value', 'transacoes');

    // Seleciona o tipo de relatório "Transação por Categoria"
    cy.get('#tipoRelatorio').select('Transação por Categoria');

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 100)

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() + 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    cy.contains("Nenhum registro identificado");
  });

  it('Testar relatório de relatório de transações sem filtro de categoria', () => {

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Verifica se as categorias foram carregadas
    cy.get('#tipoRelatorio').should('have.value', 'transacoes');

    // Seleciona o tipo de relatório "Transação por Categoria"
    cy.get('#tipoRelatorio').select('Transação por Categoria');

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 100)

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() + 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    cy.contains("Preencha uma categoria.").should('be.visible');
  });

  it('Testar relatório de relatório de despesas sem dados', () => {

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Verifica se o tipo de transação "Despesas" está selecionado por padrão
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('#despesas').should('be.checked');
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 100)

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() + 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('tipoTransacao', '1');
    });

    cy.contains("Nenhum registro identificado").should('be.visible');;
  });

  it('Testar relatório de relatório de receitas sem dados', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Seleciona o tipo de transação "Receitas"
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('#receitas').check();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 100)

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() + 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('tipoTransacao', '2');
    });

    cy.contains("Nenhum registro identificado").should('be.visible');;
  });

  it('Testar relatório de transações sem dados', () => {
    // Configurar um stub para o window.open
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Selecionar tipo de relatório e gerar relatório
    cy.get('#tipoRelatorio').select('Transações');

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 100)

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() + 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);
        
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('response.statusCode').should('eq', 200);

    cy.contains("Nenhum registro identificado").should('be.visible');;
  });

  it('Cadastrar categorias', () => {
    async function cadastrarCategorias() {
      cy.cadastraCategorias('Alimentação - ' + (new Date()).toISOString()).then(() => {
      cy.get('@categoriaData').then((dados: any) => {
        categoriaArray.push(dados); // Adiciona o ID da categoria ao array
        });
      });

      cy.cadastraCategorias('Transporte - ' + (new Date()).toISOString()).then(() => {
        cy.get('@categoriaData').then((dados: any) => {
          categoriaArray.push(dados); // Adiciona o ID da categoria ao array
        });
      });
    }

    cadastrarCategorias().then(() => {
      cy.visit('/relatorios');
    })
  })

  it('Cadastrar Transações', () => {
    const transacaoData1 = {
        "transacao": {
            "data": "2024-08-15",
            "valor": 32,
            "tipo": "1",
            "descricao": "Transação teste 1"
        },
        "categorias": [
            {
                "idCategoria": `${categoriaArray[0].id as string}`,
                "valor": 12
            },
            {
                "idCategoria": `${categoriaArray[1].id as string}`,
                "valor": 20
            }
        ]
      }

      cy.cadastraTransacao(transacaoData1);

      const transacaoData2 = {
          "transacao": {
              "data": "2024-08-15",
              "valor": 40,
              "tipo": "2",
              "descricao": "Transação teste 1"
          },
          "categorias": [
              {
                  "idCategoria": `${categoriaArray[0].id as string}`,
                  "valor": 20
              },
              {
                  "idCategoria": `${categoriaArray[1].id as string}`,
                  "valor": 20
              }
          ]
      }

      cy.cadastraTransacao(transacaoData2);
  })

  it('Deve carregar a tela de relatórios com categorias e permitir a geração de relatório de transações', () => {

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Verifica se as categorias foram carregadas
    cy.get('#tipoRelatorio').should('have.value', 'transacoes');

    // Seleciona o tipo de relatório "Transação por Categoria"
    cy.get('#tipoRelatorio').select('Transação por Categoria');

    const currentDate = new Date();

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Verifica se o dropdown de categorias é mostrado
    cy.get('select#idCategoria').should('be.visible').select(categoriaArray[0].nome);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('idCategoria', categoriaArray[0].id.toString());
    });

    cy.get('@windowOpen').should('be.calledWithMatch', /blob:/);
  });

  it('Deve permitir a geração de relatório de despesas', () => {

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Verifica se o tipo de transação "Despesas" está selecionado por padrão
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('#despesas').should('be.checked');
    const currentDate = new Date();

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('tipoTransacao', '1');
    });

    cy.get('@windowOpen').should('be.calledWithMatch', /blob:/);
  });

  it('Deve permitir a geração de relatório de receitas', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Seleciona o tipo de transação "Receitas"
    cy.get('#tipoRelatorio').select('Transações');
    cy.get('#receitas').check();
    const currentDate = new Date();

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);

    // Clica no botão de gerar relatório
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('request.body').should((body) => {
      expect(body).to.have.property('tipoTransacao', '2');
    });

    cy.get('@windowOpen').should('be.calledWithMatch', /blob:/);
  });

  it('Deve abrir o relatório em uma nova aba ao gerar o relatório', () => {
    // Configurar um stub para o window.open
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Selecionar tipo de relatório e gerar relatório
    cy.get('#tipoRelatorio').select('Transações');
    // Obtém a data atual
    const currentDate = new Date();

    // Subtrai 7 dias da data atual
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 7);

    cy.get('input#dataInicio').type(previousDate.toISOString().split('T')[0]);
    cy.get('input#dataFim').type(currentDate.toISOString().split('T')[0]);
        
    cy.get('button').contains('Gerar Relatório').click();

    // Verifica se a requisição de geração de relatório foi feita corretamente
    cy.wait('@postRelatorio').its('response.statusCode').should('eq', 200);

    cy.get('@windowOpen').should('be.calledWithMatch', /blob:/);
  });
});
