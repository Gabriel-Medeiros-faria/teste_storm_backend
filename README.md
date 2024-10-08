# Back end node project

Este é um projeto backend desenvolvido em Node.js, Express e TypeScript, utilizando Prisma ORM como ferramenta de mapeamento objeto-relacional.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte:

- Node.js
- npm (Node Package Manager) ou yarn
- Banco de dados PostgreSQL instalado localmente
- Banco de dados PostgreSQL com o nome movie_site

## Instalação

Para instalar este projeto, siga estas etapas:

1. Clone este repositório executando o seguinte comando no terminal:

   ```sh
   git clone https://github.com/Gabriel-Medeiros-faria/teste_storm_backend.git
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd seu-projeto
   ```

3. Instale as dependências do projeto usando npm ou yarn:

   ```sh
   npm install
   ```

4. Inicialize o Prisma ORM executando o seguinte comando:

   ```sh
   npx prisma generate
   ```

## Variáveis de ambiente 

O prismaORM precisa de um DATABASE_URL e eu coloquei esse DATABASE_URL dentro do meu .env

```sh
DATABASE_URL="postgresql://postgres:12345@localhost:5432/movies_site?schema=public"
```
Outra variável de ambiente que utilizei foi o JWT_SECRET 

```sh
JWT_SECRET= "storm"
```

## Execução das Migrações e Seeds

Após inicializar o Prisma, você pode executar as migrações das tabelas do banco de dados e incluir dados de exemplo utilizando o seguinte comando:

```sh
npm run migrate-and-seed
```

## Como Executar

Após a instalação das dependências, você pode executar o projeto com o seguinte comando:

```sh
npm run dev
```

Este comando iniciará o servidor de desenvolvimento. Depois de iniciado, você poderá visualizar o aplicativo em seu navegador acessando o seguinte endereço:

```
http://localhost:8080
```

## Como Executar os testes

Para executar os testes, você pode usar o seguinte comando:

```sh
npm test
```

## Como logar o usuário

Assim que você realizar as migrações do banco de dados, será inserido um usuário teste:
```sh
E-mail: teste@email.com
Senha: senha123
```

## Tecnologias Utilizadas

Este projeto utiliza várias tecnologias chave:

- **Node.js**: Um ambiente de execução JavaScript que permite executar código JavaScript no servidor.
- **Express**: Um framework web para Node.js que facilita a criação de APIs RESTful.
- **TypeScript**: Um superconjunto de JavaScript que adiciona tipagem estática opcional ao código JavaScript.
- **Prisma ORM**: Um ORM (Object-Relational Mapping) para Node.js e TypeScript que simplifica o acesso ao banco de dados com uma interface de programação de aplicativo intuitiva.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
