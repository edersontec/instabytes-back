# InstaBytes

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Aprendizados](#aprendizados)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
	- [Bibliotecas](#bibliotecas)
- [Pré-requisitos](#pre-requisitos)
- [Como instalar este projeto](#como-instalar-este-projeto)
- [Como usar este projeto](#como-usar-este-projeto)
- [Informações adicionais](#informacoes-adicionais)
- [Licença](#licenca)
- [Contribuidores](#contribuidores)

## Sobre o projeto

Este projeto é resultado da Imersão DEV Backend [Alura](https://www.alura.com.br/) feito em Dezembro de 2024. O objetivo do bootcamp foi criar uma versão inicial de uma API para uma rede social de imagens (intitulado InstaBytes).

## Funcionalidades

- listar posts: get("/posts")
- criar post: post("/posts")
- fazer upload de imagem para um post: post("/upload/:id")
- atualizar post com dados da imagem: put("/posts/:id")
- deletar post: delete("/posts/:id")

## Aprendizados

- Criação de API com Node.js e Express
- Integração do Node.js com banco de dados MongoDB
- Utilização da API Gemini para gerar descrição de imagens

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/): Ambiente de execução JS no servidor
- [MongoDB](https://www.mongodb.com/): Banco de dados MongoDB Atlas (solução cloud para armazenamento NoSQL)
- [Express](https://expressjs.com/): Framework web para Node.js

### Bibliotecas

- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai): Biblioteca para utilização da API Gemini do Google
- [Multer](https://www.npmjs.com/package/multer): Biblioteca para manipulação multipart/form-data, usado principalmente para fazer upload de arquivos
- [dotenv](https://www.npmjs.com/package/dotenv): Biblioteca para gerenciar variáveis de ambiente (arquivo .env)
- [cors](https://www.npmjs.com/package/cors): Biblioteca para gerenciar CORS - Cross-Origin Resource Sharing (Compartilhamento de recursos com origens diferentes). É um mecanismo de segurança que usa cabeçalhos adicionais HTTP para informar ao navegador que um aplicativo Web tem permissão para acessar recursos de um servidor de uma origem diferente.

## Pré-requisitos

- [Node.js e npm](https://nodejs.org/pt)
- [conta MongoDB Altas](https://www.mongodb.com/products/platform/atlas-database)
- [api-key Google Gemini](https://ai.google.dev/gemini-api/docs/api-key?hl=pt-br)

## Como instalar este projeto

- Clone o repositório: git clone https://github.com/edersontec/instabytes.git
- Baixe as dependências: npm install
- Prepare as variáveis de ambiente:
  - O arquivo *env.example* é um arquivo de exemplo para auxiliar na instalação da aplicação, basta preencher as informações
  - Renomeie o arquivo *env.example* para *.env*
  - Altere a variável **PORT** para indicar a porta que o servidor fornecerá o serviço
  - Acesse o MongoDB Atlas, crie um cluster, crie uma database (exemplo: "imersao-instabyte") e depois crie uma collection (exemplo: "posts"). Preencha as seguintes variáveis: **MONGODB_STRING_CONEXAO** (MongoDB lhe fornecerá uma string completa de conexão), **MONGODB_NOME_DATABASE**, **MONGODB_NOME_COLLECTION**
  - Acesse o Google Gemini e crie uma Chave API. Preencha a variável **GEMINI_API_KEY** (Google Gemini lhe fornecerá uma string)
- Rode o servidor: npm run dev
- O servidor será iniciado em: http://localhost:3000 (ou em outra porta que você configurou na variável **PORT**)

## Como usar este projeto

Para realizar requisições, use uma plataforma para testes de API como o [Postman](https://www.postman.com/).

- listar posts: get("/posts") // lista todos os posts

- criar post: post("/posts") // cria um novo post (sem imagem)
  - body
  ```json
  {
    "descricao": "Descrição da imagem",
    "imgUrl" : "",
    "alt": "alt opcional"
  }
  ```

- fazer upload de imagem para um post: post("/upload/:id") // faz upload da imagem para o servidor, o nome da imagem será o id do post correspondente
  -  form-data
  ```
  Key: imagem; Value: imagem.jpg
  ```

- atualizar post com dados da imagem: put("/posts/:id") // insere no banco de dados o endereço estático da imagem e a descrição da imagem gerada por IA 

- deletar post: delete("/posts/:id") // delete post no banco de dados e imagem no servidor

## Informações adicionais

- Sobre o acesso da aplicação ao MongoDB Atlas em ambiente localhost: Como você recebe um IP válido e variado conforme a conexão com seu provedor de internet, é necessário sempre se logar no MongoDB Atlas e autorizar o acesso ao IP que você possui no momento. Portanto, uma alternativa - para fins de teste - é habilitar o acesso geral ao database. Para isso entre em MongoDB Atlas > Security > Network Access > ADD IP ADDRESS > Insira IP 0.0.0.0/0

## Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

## Contribuidores

Sinta-se livre para para contribuir com o projeto

