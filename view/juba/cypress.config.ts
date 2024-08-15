import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      backendUrl: 'http://localhost:8098', // Adiciona a URL do backend como variável de ambiente
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
