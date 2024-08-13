export {}; 

declare global {
  namespace Cypress {
    interface Chainable {
      realizaLogin(): Chainable<void>
      verificaRegistro(): Chainable<void>
    }
  }
}

Cypress.Commands.add('verificaRegistro', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8098/auth/login',
    failOnStatusCode: false, // Não falha se o status for diferente de 2xx
    body: {
      email: 'novo.usuario@example.com',
      senha: 'senha123',
    }
  }).then((response) => {
    if (response.status === 401) {
      // Se o login falhar com 401, o usuário não existe, então o registramos
      cy.request('POST', 'http://localhost:8098/usuarios/register', {
        nome: 'Novo Usuário',
        email: 'novo.usuario@example.com',
        senha: 'senha123'
      }).then((registerResponse) => {
        expect(registerResponse.status).to.eq(201); // Verifica se o cadastro foi bem-sucedido
      });
    }
  });
});

Cypress.Commands.add('realizaLogin', () => {
  cy.session('novo.usuario@example.com', () => {
    cy.request('POST', 'http://localhost:8098/auth/login', {
      email: 'novo.usuario@example.com',
      senha: 'senha123'
    }).then((response) => {
      const token = response.body.token;
      cy.wrap(token).as('token'); // Armazena o token em uma alias para reutilização
      window.localStorage.setItem('token', token); // Salva o token no localStorage
    });
  });
});
