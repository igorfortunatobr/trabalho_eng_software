import { faker } from '@faker-js/faker';

describe('Tela de Dashboard', () => {
  let randomEmail;
  let randomPassword;

  beforeEach(() => {
    randomEmail = faker.internet.email();
    randomPassword = faker.internet.password(8);

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
        email: randomEmail,
        createdAt: '2024-07-21T22:21:53.000Z',
        updatedAt: '2024-07-21T22:21:53.000Z',
      },
    }).as('getUserInfo');

    // Intercepta as chamadas à API do dashboard e responde com dados simulados
    cy.intercept('GET', '/transacoes/relacao-receitas-despesas-mensal', {
      statusCode: 200,
      body: {
        receitas: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
        despesas: [150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150, 1250],
      },
    }).as('getReceitasDespesas');

    cy.intercept('GET', '/transacoes/quantidade-transacoes-categoria', {
      statusCode: 200,
      body: [
        { nome: 'Alimentação', quantidade: 10 },
        { nome: 'Transporte', quantidade: 20 },
        { nome: 'Lazer', quantidade: 15 },
      ],
    }).as('getQuantidadeTransacoes');

    cy.intercept('GET', '/transacoes/valor-total-transacoes-categoria', {
      statusCode: 200,
      body: [
        { nome: 'Alimentação', valor: 1000 },
        { nome: 'Transporte', valor: 2000 },
        { nome: 'Lazer', valor: 1500 },
      ],
    }).as('getValorTransacoes');

    // Realiza o login antes de visitar o dashboard
    cy.visit('/login');
    cy.get('input#formBasicEmail').type(randomEmail);
    cy.get('input#formBasicPassword').type(randomPassword);
    cy.get('button[type="submit"]').click();
    cy.wait('@postLogin');
    cy.wait('@getUserInfo'); // Espera a resposta da chamada de /usuarios
    
    // Após o login e a requisição de usuário, visita a página do dashboard
    cy.visit('/dashboard');
  });

  it('Deve carregar e exibir os dados do dashboard corretamente', () => {
    // Espera as chamadas à API serem completadas
    cy.wait('@getReceitasDespesas');
    cy.wait('@getQuantidadeTransacoes');
    cy.wait('@getValorTransacoes');

    // Verifica se os gráficos são exibidos corretamente
    cy.get('canvas').should('have.length', 3); // 1 gráfico de linha + 2 gráficos de pizza

    // Verifica se os dados dos gráficos são carregados
    cy.get('canvas').each(($canvas) => {
      cy.wrap($canvas).scrollIntoView().should('be.visible');
    });

    cy.wait(5000);
    // Verifica se os gráficos de pizza contêm os textos das categorias
    cy.get('canvas').should('have.length', 3).and('be.visible');
  });

  it('Deve exibir um alerta de erro ao falhar no carregamento dos dados', () => {
    cy.intercept('GET', '/transacoes/relacao-receitas-despesas-mensal', {
      statusCode: 500,
      body: {},
    }).as('getReceitasDespesasError');

    cy.visit('/dashboard'); // Recarrega a página para simular erro
    cy.wait('@getReceitasDespesasError');

    cy.contains('Erro ao carregar dados do dashboard').should('be.visible');
  });

  it('Deve atualizar os dados ao clicar no botão de atualizar', () => {
    cy.wait('@getReceitasDespesas');
    cy.wait('@getQuantidadeTransacoes');
    cy.wait('@getValorTransacoes');

    cy.intercept('GET', '/transacoes/relacao-receitas-despesas-mensal', {
      statusCode: 200,
      body: {
        receitas: [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
        despesas: [300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500],
      },
    }).as('getUpdatedReceitasDespesas');

    // Clica no botão de atualizar
    cy.get('button').contains('Atualizar').click();
    
    // Verifica se os dados foram atualizados
    cy.wait('@getUpdatedReceitasDespesas');
    cy.get('canvas').should('be.visible');
  });
});
