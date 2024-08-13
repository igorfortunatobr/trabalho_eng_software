describe('CRUD de Categorias com Controle de Acesso', () => {
  beforeEach(() => {
    // Intercepta a chamada de login e responde com sucesso
    cy.intercept('POST', '/auth/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('postLogin');

    // Intercepta a chamada para obter os dados do usuário após o login
    cy.intercept('GET', '/usuarios', {
      statusCode: 200,
      body: {
        id: 1,
        nome: 'Usuário Teste',
        email: 'teste@teste.com',
        createdAt: '2024-07-21T22:21:53.000Z',
        updatedAt: '2024-07-21T22:21:53.000Z',
      },
    }).as('getUserInfo');

    // Intercepta as chamadas de API do Dashboard para evitar erros
    cy.intercept('GET', '/transacoes/*', {
      statusCode: 200,
      body: {},
    }).as('getDashboardData');

    // Realiza o login antes de visitar a página de categorias
    cy.visit('/login');
    cy.get('input#formBasicEmail').type('teste@teste.com');
    cy.get('input#formBasicPassword').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.wait('@postLogin');
    cy.wait('@getUserInfo');

    // Redireciona manualmente para a página de categorias após o login
    cy.visit('/categorias');
    
    // Intercepta as chamadas à API para as categorias, garantindo que as categorias retornadas pertencem ao usuário
    cy.intercept('GET', '/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nome: 'Alimentação', idUsuario: 1 },
        { id: 2, nome: 'Transporte', idUsuario: 1 },
      ],
    }).as('getCategorias');

    cy.wait('@getCategorias');
  });

  it('Deve abrir o modal de criação de nova categoria e adicioná-la com sucesso', () => {
    cy.intercept('POST', '/categorias', {
      statusCode: 201,
      body: { id: 3, nome: 'Educação', idUsuario: 1 },
    }).as('postCategoria');

    // Configura a interceptação antes de clicar em "Salvar"
    cy.intercept('GET', '/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nome: 'Alimentação', idUsuario: 1 },
        { id: 2, nome: 'Transporte', idUsuario: 1 },
        { id: 3, nome: 'Educação', idUsuario: 1 },
      ],
    }).as('getCategoriasUpdated');

    cy.get('button').contains('Nova Categoria').click();
    cy.get('.modal-title').should('contain', 'Nova Categoria');
    cy.get('input#nome').type('Educação');
    cy.get('button').contains('Salvar').click();

    // Espera pela requisição de criação e atualização da lista
    cy.wait('@postCategoria');
    cy.wait('@getCategoriasUpdated');

    cy.get('tbody tr').should('have.length', 3);
    cy.contains('Educação').should('be.visible');
  });

  it('Deve abrir o modal de edição de uma categoria e editá-la com sucesso', () => {
    cy.intercept('PUT', '/categorias/2', {
      statusCode: 200,
      body: { id: 2, nome: 'Transporte Público', idUsuario: 1 },
    }).as('putCategoria');

    // Configura a interceptação antes de clicar em "Salvar"
    cy.intercept('GET', '/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nome: 'Alimentação', idUsuario: 1 },
        { id: 2, nome: 'Transporte Público', idUsuario: 1 },
      ],
    }).as('getCategoriasUpdated');

    cy.get('tbody tr').contains('Transporte').parent('tr').find('.btn-warning').click();
    cy.get('.modal-title').should('contain', 'Editar Categoria');
    cy.get('input#nome').clear().type('Transporte Público');
    cy.get('button').contains('Salvar').click();

    // Espera pela requisição de edição e atualização da lista
    cy.wait('@putCategoria');
    cy.wait('@getCategoriasUpdated');

    cy.get('tbody tr').should('have.length', 2);
    cy.contains('Transporte Público').should('be.visible');
  });

  it('Deve excluir uma categoria com sucesso', () => {
    cy.intercept('DELETE', '/categorias/2', {
      statusCode: 200,
    }).as('deleteCategoria');

    // Configura a interceptação antes de realizar a exclusão
    cy.intercept('GET', '/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nome: 'Alimentação', idUsuario: 1 },
      ],
    }).as('getCategoriasAfterDelete');

    cy.get('tbody tr').contains('Transporte').parent('tr').find('.btn-danger').click();

    // Espera pela requisição de exclusão e atualização da lista
    cy.wait('@deleteCategoria');
    cy.wait('@getCategoriasAfterDelete');

    cy.get('tbody tr').should('have.length', 1);
    cy.contains('Transporte').should('not.exist');
  });
});
