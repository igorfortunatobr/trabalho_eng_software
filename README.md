# Como configurar o App.
1 - Instalar o NodeJS na máquina. 

2 - Instalar o MySQL na máquina (Preferível que seja versão 8). 

3 - Pelo prompt de comando, ir até a pasta principal do arquivo (A que contenha o package e package-lock), rodar o comando:
    ``` npm install ```
    
4 - Executar o script presente na pasta ``` ./Banco de dados/bd.sql ``` 
    
Alterar o arquivo .env
```
DATABASE=NOME_BANCO
USERNAME=NOME_USUARIO_MYSQL
PASSWORD=SENHA_MYSQL
SECRET_KEY=CHAVE_CRIPTOGRAFIA_TOKEN_USUARIO
PORT_NODE=PORTA_API_BACKEND
```
