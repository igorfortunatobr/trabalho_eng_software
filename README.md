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

# Rodar os testes com Cypress

1 - Com o back e front já rodando, acessar a pasta ``` ./view/juba ``` e rodar no terminal: ``` npx cypress open ```.

2 - Selecionar ```E2E Testing```.

3 - Selecionar ```Continue``` e escolher o navegador desejado, depois selecionar ``` Start E2E Testing in [navegador] ```.

# Analisando a qualidade do projeto

## SonarQube

1 - Instalar o [Java 17](https://adoptium.net/en-GB/temurin/releases/?version=17&os=any&arch=any) na máquina.

2 - Baixar o [arquivo zip](https://www.sonarsource.com/products/sonarqube/downloads/) do SonarQube Community Edition.

3 - Como não root usuário, descompacte-o em, por exemplo, C:\sonarqube.

4 - Como não root usuário, inicie o servidor SonarQube: 

``` C:\sonarqube\bin\windows-x86-64\StartSonar.bat ```

5 - Depois que sua instância estiver instalada e em execução, efetue login em http://localhost:9000 usando credenciais de administrador do sistema:

Entrar: admin | Senha: admin

## SonarScanner

1 - Baixar o [SonarScanner](https://docs.sonarsource.com/sonarqube/9.9/analyzing-source-code/scanners/sonarscanner/).

2 - Extraia o conteúdo do arquivo baixado em uma pasta de sua escolha. Por exemplo, C:\sonar-scanner..

3 - Adicione a pasta bin do SonarScanner ao PATH do sistema:

No Windows, vá até Configurações do Sistema -> Variáveis de Ambiente.
Em Variáveis de Ambiente, encontre a variável Path na seção Variáveis do Sistema e clique em Editar.
Adicione um novo caminho para o diretório ```C:\sonar-scanner\bin``` e confirme.

4 - Teste a instalação com ```sonar-scanner -v```.

## Rodar a análise

1 - Substitua ```seu-token-sonarqube``` no arquivo ```sonar-project.properties``` pelo token gerado na interface do SonarQube para autenticação. Você pode gerar esse token na aba "My Account > Security". O token a ser gerado é o **token de usuário**.

2 - Execute o seguinte comando para rodar a análise: ```sonar-scanner```

3 - Acesse os resultados em ```http://localhost:9000```