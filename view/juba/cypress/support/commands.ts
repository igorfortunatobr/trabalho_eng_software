export {}; 

declare global {
  namespace Cypress {
    interface Chainable {
      realizaLogin(): Chainable<void>
      verificaRegistro(): Chainable<void>
      cadastraCategorias(nomeCategoria: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('verificaRegistro', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/auth/login`,
    failOnStatusCode: false, // Não falha se o status for diferente de 2xx
    body: {
      email: 'novo.usuario@example.com',
      senha: 'senha123',
    }
  }).then((response) => {
    if (response.status === 401) {
      // Se o login falhar com 401, o usuário não existe, então o registramos
      cy.request('POST', `${Cypress.env('backendUrl')}/usuarios/register`, {
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
    cy.request('POST', `${Cypress.env('backendUrl')}/auth/login`, {
      email: 'novo.usuario@example.com',
      senha: 'senha123'
    }).then((response) => {
      const token = response.body.token;
      cy.wrap(token).as('token'); // Armazena o token em uma alias para reutilização
      window.localStorage.setItem('token', token); // Salva o token no localStorage
    });
  });
});

Cypress.Commands.add('cadastraCategorias', (nomeCategoria) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendUrl')}/categorias`,
        headers: {
          Authorization: `${token}`, // Adiciona o token no cabeçalho
        },
        body: {
          nome: nomeCategoria,
        }
      }).then((response) => {
        expect(response.status).to.eq(201); // Verifica se o cadastro foi bem-sucedido
      });
    } else {
      throw new Error('Token não encontrado no localStorage');
    }
});
