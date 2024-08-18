describe('Tela de Dashboard', () => {
  const categoriaArray: any[] = [];

  beforeEach(() => {

    cy.verificaRegistro();
    cy.realizaLogin().then(() => {
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
    }).then(() => {
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
    }).then(() => {
      // Visitar a página de relatórios
      cy.visit('/dashboard');
    })
  });

  it('Deve carregar e exibir os dados do dashboard corretamente', () => {
    // Verifica se os gráficos são exibidos corretamente
    cy.get('canvas').should('have.length', 3); // 1 gráfico de linha + 2 gráficos de pizza

    // Verifica se os dados dos gráficos são carregados
    cy.get('canvas').each(($canvas) => {
      cy.wrap($canvas).scrollIntoView().should('be.visible');
    });
    
  });

  it('Deve atualizar os dados ao clicar no botão de atualizar', () => {
    // Clica no botão de atualizar
    cy.get('button').contains('Atualizar').click();
  
    cy.get('canvas').should('be.visible');
  });
});
