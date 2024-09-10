

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Computer setup

- Nodejs >= 16
- Docker
- Visual Studio Code

## Project setup

add **.env** file in the root of the project with the following content

```
APP_HOST=localhost
APP_PORT=3000

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
```

Install the dependencies

```bash
$ npm install
```

## Database setup

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# migration
npm run migration:generate --name=<name>
npm run migration:run
npm run migration:revert
npm run migration:show

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build Image Docker

```bash
docker compose up
```

## View the API documentation

```
http://localhost:3000/api
```