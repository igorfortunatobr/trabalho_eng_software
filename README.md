# Como configurar a aplicação.

1 - Instalar o NodeJS na máquina. 

2 - Instalar o MySQL na máquina (Preferível que seja versão 8). 

3 - Executar o script presente na pasta ``` ./Banco de dados/bd.sql ``` 

4 - Alterar o arquivo .env

```
NAME_DATABASE=NOME_BANCO
USERNAME_DATABASE=NOME_USUARIO_MYSQL
PASSWORD_DATABASE=SENHA_MYSQL
HOST_DATABASE=localhost
SECRET_KEY=CHAVE_CRIPTOGRAFIA_TOKEN_USUARIO
PORT_NODE=PORTA_API_BACKEND
```

5 - Pelo prompt de comando, ir até a pasta principal do arquivo (A que contenha o package e package-lock), rodar o comando:
    ``` npm install ``` para instalar os frameworks necessários para o backend.

6 - Rodar ``` node index ``` para subir o backend.
    
7 - Entrar na pasta ``` ./view/juba ``` e, também, rodar o ``` npm install ``` para instalar os frameworks necessários para o frontend.

8 - Rodar ``` npm run start ``` para subir o frontend.

9 - É possível acessar a aplicação em ``` http://localhost:3000/ ```.
    