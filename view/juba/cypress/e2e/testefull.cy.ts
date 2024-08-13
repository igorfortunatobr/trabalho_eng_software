describe('Fluxo Completo: Cadastro de Usuário, Login, Dashboard, Categorias e Transações', () => {
  const usuario = {
    nome: 'Teste Cypress',
    email: `teste.cypress.${Date.now()}@teste.com`,
    senha: 'senha123',
  };

  const categoriaNome = 'Categoria Teste';
  const categoriaNomeEditado = 'Categoria Editada';
  const transacaoDescricao = 'Transação Teste';
  const transacaoDescricaoEditada = 'Transação Editada';

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

  it('Deve fazer login com o usuário recém-cadastrado e armazenar o token', () => {
    cy.visit('/login');

    // Preenche o formulário de login
    cy.get('input#formBasicEmail').type(usuario.email);
    cy.get('input#formBasicPassword').type(usuario.senha);
    cy.get('button[type="submit"]').contains('Entre').click();

    // Verifica se foi redirecionado para o dashboard
    cy.url().should('include', '/dashboard');

    // Verifica se o token foi armazenado no localStorage
    cy.window().its('localStorage.token').should('exist');
  });

  it('Deve visualizar o Dashboard sem informações iniciais', () => {
    // Intercepta a requisição de carregamento de dados do dashboard
    cy.intercept('GET', '/transacoes/relacao-receitas-despesas-mensal').as('getDashboardData');

    // Aguarda a requisição e verifica o conteúdo
    cy.wait('@getDashboardData');
    cy.contains('Receitas vs Despesas (Mensal)').should('be.visible');
    cy.get('canvas').should('exist');
    cy.contains('0,00').should('be.visible'); // Verifica se o saldo, receitas, e despesas estão zerados
  });

  it('Deve cadastrar, editar e excluir uma categoria', () => {
    // Intercepta a requisição para carregar as categorias
    cy.intercept('GET', '/categorias').as('getCategorias');

    // Navega para a página de categorias após o login
    cy.visit('/categorias');
    cy.wait('@getCategorias');

    // Tenta criar uma categoria sem nome para verificar a validação
    cy.get('button').contains('Nova Categoria').click();
    cy.get('button').contains('Salvar').click();
    cy.contains('Preencha o nome da categoria').should('be.visible');

    // Cria uma nova categoria corretamente
    cy.get('input#nome').type(categoriaNome);
    cy.get('button').contains('Salvar').click();
    cy.contains(categoriaNome).should('be.visible');

    // Edita a categoria existente
    cy.contains(categoriaNome).parent('tr').find('.btn-warning').click();
    cy.get('input#nome').clear().type(categoriaNomeEditado);
    cy.get('button').contains('Salvar').click();
    cy.contains(categoriaNomeEditado).should('be.visible');

    // Exclui a categoria existente
    cy.contains(categoriaNomeEditado).parent('tr').find('.btn-danger').click();
    cy.contains(categoriaNomeEditado).should('not.exist');
  });

  it('Deve cadastrar, editar e excluir uma transação', () => {
    // Intercepta a requisição para carregar as transações
    cy.intercept('GET', '/transacoes/all').as('getTransacoes');

    // Navega para a página de transações após o login
    cy.visit('/transacoes');
    cy.wait('@getTransacoes');

    // Tenta criar uma transação sem adicionar categorias para verificar a validação
    cy.get('button').contains('Nova Transação').click();
    cy.get('input#descricao').type(transacaoDescricao);
    cy.get('input[type="date"]').type('2024-08-15');
    cy.get('button').contains('Salvar').click();
    cy.contains('Adicione ao menos uma categoria').should('be.visible');

    // Cria uma nova categoria para ser usada na transação
    cy.visit('/categorias');
    cy.get('button').contains('Nova Categoria').click();
    cy.get('input#nome').type(categoriaNome);
    cy.get('button').contains('Salvar').click();
    cy.visit('/transacoes');

    // Cria uma nova transação corretamente
    cy.get('select#novaCategoria').select(categoriaNome);
    cy.get('input[placeholder="0,00"]').eq(1).type('500');
    cy.get('button').contains('Adicionar Categoria').click();
    cy.get('button').contains('Salvar').click();
    cy.contains(transacaoDescricao).should('be.visible');

    // Edita a transação existente
    cy.contains(transacaoDescricao).parent('tr').find('.btn-warning').click();
    cy.get('input#descricao').clear().type(transacaoDescricaoEditada);
    cy.get('button').contains('Salvar').click();
    cy.contains(transacaoDescricaoEditada).should('be.visible');

    // Exclui a transação existente
    cy.contains(transacaoDescricaoEditada).parent('tr').find('.btn-danger').click();
    cy.contains(transacaoDescricaoEditada).should('not.exist');
  });

  it('Deve visualizar o Dashboard com informações após os cadastros', () => {
    // Intercepta a requisição de carregamento de dados do dashboard
    cy.intercept('GET', '/transacoes/relacao-receitas-despesas-mensal').as('getDashboardDataUpdated');

    // Navega para o dashboard novamente após a criação de transações
    cy.visit('/dashboard');
    cy.wait('@getDashboardDataUpdated');

    // Verifica se o dashboard agora contém informações
    cy.contains('Receitas vs Despesas (Mensal)').should('be.visible');
    cy.contains('Total Receitas').should('be.visible');
    cy.contains('Total Despesas').should('be.visible');
    cy.get('canvas').should('exist');

    // Verifica se os valores de receitas e despesas foram atualizados
    cy.contains('500,00').should('be.visible'); // Valor da transação cadastrada
  });
});
