describe('Fluxo Completo: Cadastro de Categoria', () => {
  
  beforeEach(() => {
    cy.verificaRegistro();
    cy.realizaLogin();

    cy.visit('/categorias');
  });

  it('Deve redirecionar para a página de categorias e cadastrar uma nova categoria', () => {
    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Listagem de Categorias').should('be.visible');

    // Cria uma nova categoria
    cy.get('button').contains('Nova Categoria').click();
    cy.get('input#nome').type('Categoria Teste');
    cy.get('button').contains('Salvar').click();

    // Verifica se a nova categoria aparece na lista
    cy.contains('Categoria Teste').should('be.visible');

    // Cria uma nova categoria
    cy.get('button').contains('Nova Categoria').click();
    cy.get('input#nome').type('Categoria Teste 2');
    cy.get('button').contains('Salvar').click();

    // Verifica se a nova categoria aparece na lista
    cy.contains('Categoria Teste 2').should('be.visible');
  });

  it('Deve validar mensagem de campo não preenchido.', () => {
    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Listagem de Categorias').should('be.visible');

    // Cria uma nova categoria
    cy.get('button').contains('Nova Categoria').click();
    cy.get('input#nome').clear();
    cy.get('button').contains('Salvar').click();
    cy.contains('Preencha o nome da categoria').should('be.visible');

    // Verificar se depois de preencher, salva normalmente.
    cy.get('input#nome').type('Categoria Teste 3');
    cy.get('button').contains('Salvar').click();
    cy.contains('Categoria Teste 3').should('be.visible');
  });

  it('Deve validar o botão de cancelar', () => {
    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Listagem de Categorias').should('be.visible');

    // Cria uma nova categoria
    cy.get('button').contains('Nova Categoria').click();
    cy.get('input#nome').clear();
    cy.get('button').contains('Cancelar').click();
    cy.contains('Listagem de Categorias').should('be.visible');
  });

  it('Deve editar a categoria já existente', () => {
    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Categoria Teste 2').should('be.visible');

    cy.contains('Categoria Teste 2').parent('tr').find('.btn-warning').click();

    // Editar Categoria
    cy.contains('Editar Categoria');
    cy.get('input#nome').clear().type('Categoria Teste EDITADA');
    cy.get('button').contains('Salvar').click();

    // Verifica se a categoria editada aparece na lista
    cy.contains('Categoria Teste EDITADA').should('be.visible');
  });

  it('Deve excluir a categoria já existente', () => {
    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Categoria Teste EDITADA').should('be.visible');

    cy.contains('Categoria Teste EDITADA').parent('tr').find('.btn-danger').click();

    // Verifica se a categoria editada aparece na lista
    cy.contains('Categoria Teste EDITADA').should('not.exist');
    cy.contains('Categoria excluída com sucesso');
  });

  let categoria: any;

  it('Cadastrar categorias', () => {
    cy.cadastraCategorias('Teste exclusão - ' + (new Date()).toISOString()).then(() => {
    cy.get('@categoriaData').then((dados: any) => {
      categoria = dados; // Adiciona o ID da categoria ao array
      });
    });
  });

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
                "idCategoria": `${categoria.id as string}`,
                "valor": 12
            }
        ]
      }
    cy.cadastraTransacao(transacaoData1);
  })

  it('Bloquear exclusão de categoria com alguma transação vinculada', () => {
    cy.visit("/categorias")

    // Verifica se a página de categorias foi carregada corretamente
    cy.contains(categoria.nome).should('be.visible');

    cy.contains(categoria.nome).parent('tr').find('.btn-danger').click();

    // Verifica se a categoria aparece na lista
    cy.contains(categoria.nome).should('exist');
    cy.contains('Categoria excluída com sucesso').should('not.exist');;
  })
});
