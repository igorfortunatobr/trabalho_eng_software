describe('Teste de perfil do usuário', () => {
  beforeEach(() => {
      cy.verificaRegistro();
      cy.realizaLogin();

      cy.visit('/usuario');
  });

  it('Deve carregar a página de perfil corretamente e possibilitar editar o nome do usuário.', () => {
    cy.contains("Perfil do Usuário").should('be.visible');

    const newName = "Usuário editado - " + (new Date()).toISOString();

    cy.contains("Editar").click();

    cy.get('input#formName').clear().type(newName);

    cy.contains("Salvar").click();

    cy.contains("Dados atualizados com sucesso").should('be.visible');
  });

  it('Não deve permitir nome vazio.', () => {
    cy.contains("Perfil do Usuário").should('be.visible');

    cy.contains("Editar").click();

    cy.get('input#formName').clear();

    cy.contains("Salvar").click();

    cy.contains("Nome não pode ser vazio").should('be.visible');
  });

  it('Deve editar a senha.', () => {
    cy.contains("Alterar senha").click();

    cy.get('input#formPassword[name="password"]').clear().type('senha123');
    cy.get('input#formPassword[name="confirmPassword"]').clear().type('senha123');

    cy.contains("Salvar").click();

    cy.contains("Senha atualizada com sucesso").should('be.visible');
  });

  it('Deve verificar se a senha é vazia.', () => {
    cy.contains("Alterar senha").click();

    cy.get('input#formPassword[name="password"]').clear()
    cy.get('input#formPassword[name="confirmPassword"]').clear()

    cy.contains("Salvar").click();

    cy.contains("Senha não pode ser vazia").should('be.visible');
  });



  it('Deve verificar se as senhas são iguais', () => {
    cy.contains("Alterar senha").click();

    cy.get('input#formPassword[name="password"]').clear().type('senha123');
    cy.get('input#formPassword[name="confirmPassword"]').clear().type('123senha');

    cy.contains("Salvar").click();

    cy.contains("As senhas não coincidem").should('be.visible');
  });

});