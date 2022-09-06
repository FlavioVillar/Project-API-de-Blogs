# Projeto API de Blogs!

Projeto desenvolvido por estudante durante o curso de desenvolvimento back-end da **Trybe**
<br />

# Tecnologias e ferramentas usadas.

- Sequelize 
- Express 
- NodeJS 
- Mysql 
- Joi
- jsonwebtoken
- dotenv
<br />

# 👨‍💻 O que foi desenvolvido

  Uma API e um banco de dados para a produção de conteúdo para um blog, 

  Uma aplicação utilizando o `Node.js`, usando o pacote `sequelize` para fazer um `CRUD` de posts.

<br />

# Orientações

- Instale as aplicações na ***pasta raiz*** com:  `npm install` 

- Crie um arquivo .env (conforme exemplo em `.env.example`)

- Execute o docker compose com o comando: `docker-compose up -d`

- Execute o comando para entrar no terminal do docker: `docker exec -it blogs_api bash`

- Execute o comando para criar o banco e gera as tabelas: `npm run prestart`

- Execute o comando para inserir dados/Popular a tabela: `npm run seed`

- Execute o comando para usar a aplicação: `npm start`


# Usando a aplicação

- Crie um novo usuário através do endpoint POST, na URL `/user`.
- O corpo da requisição deverá seguir o formato abaixo:
```json
  {
    "displayName": "name_exemple",
    "email": "email@email.com",
    "password": "123456",
    "image": "Link da imagem"
  }
  ```
  - será gerado um token para a criação e edição de posts no blog.

