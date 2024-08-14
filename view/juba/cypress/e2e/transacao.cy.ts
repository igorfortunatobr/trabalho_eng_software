describe('TransacaoCRUD', () => {
  
    beforeEach(() => {
        cy.verificaRegistro();
        cy.realizaLogin();

        cy.visit('/transacoes');
    });

    it('Deve carregar a página de transações corretamente e inserir uma nova transação do tipo DESPESA', () => {
        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 1');
        const currentDate = new Date().toISOString().split('T')[0];
        cy.get('input#data').type(currentDate);
        cy.get('input#despesa').check();
        
        // Adicionar a primeira categoria
        // Adicionar a primeira categoria
        let firstValue = '';
        cy.get('select#novaCategoria').then($select => {
            // Encontra todas as opções que não têm o valor vazio
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '';
            });

            // Seleciona a primeira opção válida
            if (validOptions.length > 0) {
                firstValue = (validOptions[0] as HTMLOptionElement).value;
                cy.wrap($select).select(firstValue);
            }
        });

        cy.get('input#novaCategoria').type('20.00');
        cy.get('button').contains('Adicionar Categoria').click();

        // Adicionar a segunda categoria, diferente da primeira
        cy.get('select#novaCategoria').then($select => {
            // Encontra todas as opções que não têm o valor vazio
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '' && (option as HTMLOptionElement).value !== firstValue;
            });

            // Seleciona a segunda opção válida, diferente da primeira
            if (validOptions.length > 1) {
                cy.wrap($select).invoke('val').then(firstValue => {
                    const secondValue = validOptions.filter((index, option) => {
                        return (option as HTMLOptionElement).value !== firstValue;
                    }).eq(0).val();
                    if (secondValue) {
                        cy.wrap($select).select(secondValue as string);
                    }
                });
            }
        });

        cy.get('input#novaCategoria').type('50.00');
        cy.get('button').contains('Adicionar Categoria').click();

        cy.get('button').contains('Salvar').click();
        cy.wait(10);
        cy.contains('Transação Teste 1').should('be.visible');
        //cy.get('card').contains('R$ 70,00').should('be.visible');
    });

    it('Inserir uma nova transação do tipo RECEITA', () => {
        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 2');
        const currentDate = new Date().toISOString().split('T')[0];
        cy.get('input#data').type(currentDate);
        cy.get('input#receita').check();
        
        // Adicionar a primeira categoria
        let firstValue = '';
        cy.get('select#novaCategoria').then($select => {
            // Encontra todas as opções que não têm o valor vazio
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '';
            });

            // Seleciona a primeira opção válida
            if (validOptions.length > 0) {
                firstValue = (validOptions[0] as HTMLOptionElement).value;
                cy.wrap($select).select(firstValue);
            }
        });

        cy.get('input#novaCategoria').type('300.00');
        cy.get('button').contains('Adicionar Categoria').click();

        // Adicionar a segunda categoria, diferente da primeira
        cy.get('select#novaCategoria').then($select => {
            // Encontra todas as opções que não têm o valor vazio
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '' && (option as HTMLOptionElement).value !== firstValue;
            });

            // Seleciona a segunda opção válida, diferente da primeira
            if (validOptions.length > 1) {
                cy.wrap($select).invoke('val').then(firstValue => {
                    const secondValue = validOptions.filter((index, option) => {
                        return (option as HTMLOptionElement).value !== firstValue;
                    }).eq(0).val();
                    if (secondValue) {
                        cy.wrap($select).select(secondValue as string);
                    }
                });
            }
        });

        cy.get('input#novaCategoria').type('60.00');
        cy.get('button').contains('Adicionar Categoria').click();

        cy.get('button').contains('Salvar').click();
        cy.wait(10);
        cy.contains('Transação Teste 2').should('be.visible');
        //cy.get('card').contains('R$ 360,00').should('be.visible');
    });

    it('Inserir e editar uma nova transação', () => {
        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 3');
        const currentDate = new Date().toISOString().split('T')[0];
        cy.get('input#data').type(currentDate);
        cy.get('input#receita').check();
        
        // Adicionar a primeira categoria
        let firstValue = '';
        cy.get('select#novaCategoria').then($select => {
            // Encontra todas as opções que não têm o valor vazio
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '';
            });

            // Seleciona a primeira opção válida
            if (validOptions.length > 0) {
                firstValue = (validOptions[0] as HTMLOptionElement).value;
                cy.wrap($select).select(firstValue);
            }
        });

        cy.get('input#novaCategoria').type('11.00');
        cy.get('button').contains('Adicionar Categoria').click();

        // Adicionar a segunda categoria, diferente da primeira
        cy.get('select#novaCategoria').then($select => {
            // Encontra todas as opções que não têm o valor vazio
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '' && (option as HTMLOptionElement).value !== firstValue;
            });

            // Seleciona a segunda opção válida, diferente da primeira
            if (validOptions.length > 1) {
                cy.wrap($select).invoke('val').then(firstValue => {
                    const secondValue = validOptions.filter((index, option) => {
                        return (option as HTMLOptionElement).value !== firstValue;
                    }).eq(0).val();
                    if (secondValue) {
                        cy.wrap($select).select(secondValue as string);
                    }
                });
            }
        });

        cy.get('input#novaCategoria').type('12.00');
        cy.get('button').contains('Adicionar Categoria').click();

        cy.get('button').contains('Salvar').click();
        cy.wait(10);
        cy.contains('Transação Teste 3').should('be.visible');

        cy.contains('Transação Teste 3').parent('tr').find('.btn-warning').click();
        cy.get('input#descricao').clear().type('Transação Teste EDITADA');
        cy.get('input#despesa').check();
        cy.get('button').contains('Salvar').click();
        cy.contains('Transação Teste EDITADA').should('be.visible');

        //cy.get('card').contains('R$ 360,00').should('be.visible');
    });

    it('Deve excluir uma transação já existente', () => {
    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Transação Teste EDITADA').should('be.visible');

    cy.contains('Transação Teste 1').parent('tr').find('.btn-danger').click();
    cy.contains('Transação Teste 2').parent('tr').find('.btn-danger').click();
    cy.contains('Transação Teste EDITADA').parent('tr').find('.btn-danger').click();

    // Verifica se a categoria editada aparece na lista
    cy.contains('Transação Teste 1').should('not.exist');
    cy.contains('Transação Teste 2').should('not.exist');
    cy.contains('Transação Teste EDITADA').should('not.exist');
    //cy.contains('Transação excluída com sucesso');
  });

});