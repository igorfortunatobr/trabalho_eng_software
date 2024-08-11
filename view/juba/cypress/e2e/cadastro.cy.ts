describe('Teste de Cadastro de usuário', () => {
  it('Visitar página inicial', () => {
    cy.visit('/');
    cy.contains('Login')
    cy.contains('Criar conta')
  })

  it('Visitar página de cadastro', () => {
    cy.visit('/register');
    cy.get('#formNome').type('User Test');
    cy.get('#formEmail').type('fake@email.com');
    cy.get('#formPassword').type('123456');
    cy.get('#formConfirmPassword').type('123456');
    cy.contains('Criar conta').click();
    cy.contains('Entre')
  })

  it('Visitar página de login', () => {
    cy.visit('/login');
    cy.get('#formBasicEmail').type('fake@email.com');
    cy.get('#formBasicPassword').type('123456');
    cy.contains('Entre').click();
  })
})