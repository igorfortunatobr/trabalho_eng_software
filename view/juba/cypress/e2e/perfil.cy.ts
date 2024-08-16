describe('Teste de perfil do usuário', () => {
  beforeEach(() => {
      cy.verificaRegistro();
      cy.realizaLogin();

      cy.visit('/usuario');
  });

  it('Deve carregar a página de perfil corretamente e possibilitar editar o nome do usuário.', () => {
    cy.contains("Perfil do Usuário").should('be.visible');

    let newName = "Usuário editado - " + (new Date()).toISOString();

    cy.contains("Editar").click();

    cy.get('input#formName').clear().type(newName);

    cy.contains("Salvar").click();

    cy.contains("Dados atualizados com sucesso").should('be.visible');
  });

  it('Deve editar a senha.', () => {
    cy.contains("Alterar senha").click();

    cy.get('input#formPassword[name="password"]').clear().type('senha123');
    cy.get('input#formPassword[name="confirmPassword"]').clear().type('senha123');

    cy.contains("Salvar").click();

    cy.contains("Senha atualizada com sucesso").should('be.visible');
  });

});