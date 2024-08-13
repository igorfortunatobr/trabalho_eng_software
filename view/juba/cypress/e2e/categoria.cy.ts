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
  });
});
