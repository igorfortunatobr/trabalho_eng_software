describe('Fluxo Completo: Cadastro de Usuário, Login, Visualização do Dashboard e Cadastro de Categoria', () => {
  const usuario = {
    nome: 'Teste Cypress',
    email: `teste.cypress.${Date.now()}@teste.com`,
    senha: 'senha123',
  };

  it('Deve cadastrar um novo usuário', () => {
    cy.visit('/register');

    // Preenche o formulário de cadastro
    cy.get('input#formNome').type(usuario.nome);
    cy.get('input#formEmail').type(usuario.email);
    cy.get('input#formPassword').type(usuario.senha);
    cy.get('input#formConfirmPassword').type(usuario.senha);
    cy.get('button[type="submit"]').contains('Criar conta').click();

    // Verifica se foi redirecionado para a tela de login
    cy.url().should('include', '/login');
  });

  it('Deve fazer login com o usuário recém-cadastrado', () => {
    cy.visit('/login');

    // Preenche o formulário de login
    cy.get('input#formBasicEmail').type(usuario.email);
    cy.get('input#formBasicPassword').type(usuario.senha);
    cy.get('button[type="submit"]').contains('Entre').click();

    // Verifica se foi redirecionado para o dashboard
    cy.url().should('include', '/dashboard');
  });

  it('Deve visualizar o Dashboard sem informações iniciais', () => {
    // Verifica se o dashboard está vazio ou com dados mínimos
    cy.contains('Receitas vs Despesas (Mensal)').should('be.visible');
    cy.get('canvas').should('exist');

    // Verifica se não há transações ou se há um estado de vazio
    cy.contains('Transações por Categoria (Quantidade)').should('be.visible');
    cy.contains('Transações por Categoria (Valor)').should('be.visible');
  });

  it('Deve redirecionar para a página de categorias e cadastrar uma nova categoria', () => {
    // Redireciona manualmente para a página de categorias
    cy.visit('/categorias');

    // Verifica se a página de categorias foi carregada corretamente
    cy.contains('Listagem de Categorias').should('be.visible');

    // Cria uma nova categoria
    cy.get('button').contains('Nova Categoria').click();
    cy.get('input#nome').type('Categoria Teste');
    cy.get('button').contains('Salvar').click();

    // Verifica se a nova categoria aparece na lista
    cy.contains('Categoria Teste').should('be.visible');
  });
});
