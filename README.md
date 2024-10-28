# API CRUD
### Stack: Nodejs, TypeScript, Express, Sequelize and MySQL

#### Descrição: 
Este projeto é uma aplicação de gerenciamento de usuários que permite criar, listar, atualizar e deletar registros de usuários com filtros específicos.

#### Como configurar o ambiente:
1. Clone o repositório: `git clone `
2. Execute o comando `yarn install` para instalar as dependências.
3. Configure o arquivo `.env` baseado no arquivo `.env.example`.
Caso seja feita a troca dos valores do `.env.example`, mude os valores de acordo no arquivo `docker-compose.yml`
4. Após isso, com a aplicação do Docker funcionando, execute `docker compose up -d` ou `docker compose up --watch` para criar o banco de dados MySQL.

#### Como executar a aplicação:
1. Para iniciar a aplicação, execute `yarn start`

#### Como rodar os testes:
1. Para rodar os testes, execute `yarn jest --verbose`

#### Endpoints disponíveis e exemplos de requisições:
A aplicação possui os seguintes endpoints para operações CRUD de usuários.

1. Listagem de usuários
   * Endpoint: `GET /users`
   * Filtros disponíveis:
        * **nome** (pesquisa parcial, ex: /users?nome=Pat)
        * **idade** (pequisa exata, ex: /users?idade=25)
        * **idadeMin** e **idadeMax** (faixa etária, ex: /users?idadeMin=20&idadeMax=30)
   * Exemplo de Requisição: `curl -X GET "http://localhost:3000/users?idade=27"`

2. Listar usuário por ID
   * Endpoint: `GET /users/:id`
   * Exemplo de Requisição: `curl -X GET "http://localhost:3000/users/1"`

3. Criar usuário 
   * Endpoint: `POST /users`
   * Body: JSON com os campos nome e email (obrigatório) e idade (opcional).
   * Exemplo de Requisição: `curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d '{"nome": "Alice", "email": "alice@example.com"}'`

4. Atualizar Usuário por ID
   * Endpoint: `PUT /users/:id`
   * Body: JSON com os campos opcionais nome, email, idade e ativo.
   * Exemplo de Requisição: `curl -X PUT "http://localhost:3000/users/1" -H "Content-Type: application/json" -d '{"email": "alice@mail.com"}'`

5. Deletar Usuário por ID
   * Endpoint: `DELETE /users/:id`
   * Exemplo de Requisição: `curl -X DELETE "http://localhost:3000/users/1"`



