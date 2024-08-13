import { faker } from '@faker-js/faker';

describe('Cadastro', () => {
  let randomName: string;
  let randomEmail: string;
  let randomPassword: string;

  beforeEach(() => {
    randomName = faker.name.fullName();  // Gera um nome completo aleatório
    randomEmail = faker.internet.email();  // Gera um e-mail aleatório
    randomPassword = faker.internet.password(8);  // Gera uma senha aleatória com 8 caracteres
    
    cy.visit('/register');
  });

  it('Deve carregar a página de cadastro corretamente', () => {
    cy.contains('Cadastre-se em nosso sistema!').should('be.visible');
    cy.get('input#formNome').should('be.visible');
    cy.get('input#formEmail').should('be.visible');
    cy.get('input#formPassword').should('be.visible');
    cy.get('input#formConfirmPassword').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Deve mostrar erro se as senhas não coincidirem', () => {
    cy.get('input#formNome').type(randomName);
    cy.get('input#formEmail').type(randomEmail);
    cy.get('input#formPassword').type(randomPassword);
    cy.get('input#formConfirmPassword').type('senhaDiferente');
    cy.get('button[type="submit"]').click();

    cy.contains('As senhas não coincidem.').should('be.visible');
  });

  it('Deve mostrar erro quando os dados estão incompletos', () => {
    // Deixe o campo nome vazio, não interagindo com ele
    cy.get('input#formEmail').type(randomEmail);
    cy.get('input#formPassword').type(randomPassword);
    cy.get('input#formConfirmPassword').type(randomPassword);
    cy.get('button[type="submit"]').click();

    cy.get('input#formNome:invalid').then($input => {
      const inputElement = $input[0] as HTMLInputElement;
      expect(inputElement.validationMessage).to.eq('Preencha este campo.');
    });
  });

  it('Deve mostrar erro ao tentar registrar um e-mail duplicado', () => {
    cy.intercept('POST', '/usuarios/register', {
      statusCode: 409,
      body: {
        message: 'Já existe um usuário registrado com este e-mail.',
        errCode: 'USER_DUPLICATE',
      },
    }).as('postRegister');

    cy.get('input#formNome').type(randomName);
    cy.get('input#formEmail').type(randomEmail);
    cy.get('input#formPassword').type(randomPassword);
    cy.get('input#formConfirmPassword').type(randomPassword);
    cy.get('button[type="submit"]').click();

    cy.wait('@postRegister');
    cy.contains('Já existe um usuário registrado com este e-mail.').should('be.visible');
  });

  it('Deve redirecionar para a página de login após registro bem-sucedido', () => {
    cy.intercept('POST', '/usuarios/register', {
      statusCode: 201,
      body: {},
    }).as('postRegister');

    cy.get('input#formNome').type(randomName);
    cy.get('input#formEmail').type(randomEmail);
    cy.get('input#formPassword').type(randomPassword);
    cy.get('input#formConfirmPassword').type(randomPassword);
    cy.get('button[type="submit"]').click();

    cy.wait('@postRegister');
    cy.url().should('include', '/login');
  });
});
