import { faker } from '@faker-js/faker';

describe('Tela de Login', () => {
  let randomEmail : string;
  let randomPassword : string;

  beforeEach(() => {
    randomEmail = faker.internet.email();  // Gera um e-mail aleatório
    randomPassword = faker.internet.password(8);  // Gera uma senha aleatória com 8 caracteres
    
    cy.visit('/login'); // Substitua com a rota correta para a página de login
  });

  it('Deve carregar a página de login corretamente', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input#formBasicEmail').should('be.visible');
    cy.get('input#formBasicPassword').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Deve mostrar mensagem "Preencha este campo" se o e-mail não for preenchido', () => {
    cy.get('input#formBasicPassword').type(randomPassword);
    
    cy.get('button[type="submit"]').click();

    cy.get('input#formBasicEmail:invalid').then($input => {
      const inputElement = $input[0] as HTMLInputElement;
      expect(inputElement.validationMessage).to.eq('Preencha este campo.');
    });
  });

  it('Deve mostrar mensagem "Preencha este campo" se a senha não for preenchida', () => {
    cy.get('input#formBasicEmail').type(randomEmail);
    
    cy.get('button[type="submit"]').click();

    cy.get('input#formBasicPassword:invalid').then($input => {
      const inputElement = $input[0] as HTMLInputElement;
      expect(inputElement.validationMessage).to.eq('Preencha este campo.');
    });
  });

  it('Deve mostrar erro com credenciais inválidas', () => {
    cy.intercept('POST', '/auth/login', {
      statusCode: 401,
      body: {
        message: 'Credenciais inválidas. Tente novamente.',
        errCode: 'INVALID_CREDENTIALS',
      },
    }).as('postLogin');

    cy.get('input#formBasicEmail').type(randomEmail);
    cy.get('input#formBasicPassword').type(randomPassword);
    cy.get('button[type="submit"]').click();

    cy.wait('@postLogin');
    cy.contains('Credenciais inválidas. Tente novamente.').should('be.visible');
  });

  it('Deve redirecionar para o dashboard após login bem-sucedido', () => {
    cy.intercept('POST', '/auth/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('postLogin');

    cy.get('input#formBasicEmail').type(randomEmail);
    cy.get('input#formBasicPassword').type(randomPassword);
    cy.get('button[type="submit"]').click();

    cy.wait('@postLogin');
    cy.url().should('include', '/dashboard');
  });

  it('Deve permitir navegação para a tela de cadastro', () => {
    cy.contains('Cadastre-se').click();
    cy.url().should('include', '/register');
  });
});
