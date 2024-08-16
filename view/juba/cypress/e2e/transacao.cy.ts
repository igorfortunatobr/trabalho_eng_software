import { wait } from "@testing-library/user-event/dist/utils";

describe('TransacaoCRUD', () => {
  
    beforeEach(() => {
        cy.verificaRegistro();
        cy.realizaLogin();
        
        const categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5'];
        categorias.forEach(categoria => {
            cy.cadastraCategorias(categoria);
        });

        cy.visit('/transacoes');
    });

    it('Deve carregar a página de transações corretamente e inserir uma nova transação do tipo DESPESA', () => {
        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 1');
        const currentDate = new Date().toISOString().split('T')[0];
        cy.get('input#data').type(currentDate);
        cy.get('input#despesa').check();
        
        // Adicionar a primeira categoria à transação
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
        //Espera 10 segundos para a tela carregar
        cy.wait(10);
        cy.contains('Transação Teste 1').should('be.visible');
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
    });

    it('Deve impedir inserção de transação sem categoria', () => {

        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 2');
        cy.get('input#despesa').check();

        // Tentar salvar sem adicionar categoria
        cy.get('button').contains('Salvar').click();
        cy.contains('Adicione ao menos uma categoria');
    });

    it('Deve impedir inserção de transação sem descrição', () => {

        cy.contains('Listagem de Transações').should('be.visible');
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#despesa').check();
        
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

        // Tentar salvar sem descrição
        cy.get('button').contains('Salvar').click();
        cy.wait(10);
        cy.contains('Descrição é obrigatória').should('be.visible');
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
    });

    it('Deve verificar os totalizadores após inserir uma transação', () => {
        cy.contains('Listagem de Transações').should('be.visible');

        // Captura os valores iniciais dos totalizadores
        let initialReceitas = 0;
        let initialDespesas = 0;
        let initialSaldo = 0;

        cy.get('.card-title').contains('Total Receitas').parent().find('.card-text').invoke('text').then((text) => {
            initialReceitas = parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim());
        });

        cy.get('.card-title').contains('Total Despesas').parent().find('.card-text').invoke('text').then((text) => {
            initialDespesas = parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim());
        });

        cy.get('.card-title').contains('Saldo').parent().find('.card-text').invoke('text').then((text) => {
            initialSaldo = parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim());
        });

        // Inicia a inserção da nova transação
        cy.get('button').contains('Nova Transação').click();
        cy.get('input#descricao').type('Transação Teste 2');
        cy.get('input#receita').check();
        
        // Adicionar a primeira categoria
        let firstValue = '';
        cy.get('select#novaCategoria').then($select => {
            const validOptions = $select.find('option').filter((index, option) => {
                return (option as HTMLOptionElement).value !== '';
            });

            if (validOptions.length > 0) {
                firstValue = (validOptions[0] as HTMLOptionElement).value;
                cy.wrap($select).select(firstValue);
            }
        });

        const newTransactionValue = 250.00;

        cy.get('input#novaCategoria').type(newTransactionValue.toString());
        cy.get('button').contains('Adicionar Categoria').click();

        cy.get('button').contains('Salvar').click();

        console.log(initialReceitas);
        console.log(initialDespesas);
    
        // Verifica os totalizadores após a inserção
        cy.get('.card-title').contains('Total Receitas').parent().find('.card-text').should(($receitas) => {
            const finalReceitas = parseFloat($receitas.text().replace('R$', '').replace(',', '.').trim());
            expect(finalReceitas).to.equal(initialReceitas + newTransactionValue);
        });

        cy.get('.card-title').contains('Saldo').parent().find('.card-text').should(($saldo) => {
            const finalSaldo = parseFloat($saldo.text().replace('R$', '').replace(',', '.').trim());
            const expectedSaldo = (initialReceitas + newTransactionValue) - initialDespesas;
            expect(finalSaldo).to.equal(expectedSaldo);
        });
    });
});