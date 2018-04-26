# Typescript-Rest ExpressJS Boilerplate Web Server

This is a basic example of a **[typescript-rest](https://github.com/thiagobustamante/typescript-rest)** Node server running ExpressJS with Sequelize migrations for a postgres database.

## Pre-Requisites

* NodeJS (this was built with version >=8)
* Postgres 9.8 installed locally

## Running

Get started with `npm run`.

You can execute the sample routes like `http://localhost:4500/example/test` and a more complex one that involves querying the local database with `http://localhost:4500/example/complex-test?search=test` where you'll see the default inserted user come up becaues of the query parameter 'search' matching their email address.

## API Routes

The API routes are written with decorated `typescript-rest` and two examples can be found under `/server/api/examples.ts` - they give you a feel for basic and complex examples routes. The second example shows querying a database and using async/await for clean server code.

## Interfaces
Typescript interfaces are under `/server/interfaces.ts`. The default tslint settings are based off a modified form of Microsoft's `tslint-microsoft-contrib` package used internally at Microsoft.

## Migrations

There are example Sequelize models under `/server/models` and migrations in `/server/migrations`. Due to limitations of how umzug and Typescript work, we have to write in plain old javascript for the migrations. 

The models are bootstrapped upon launching the server, and Umzug then runs migrations appropriately.

## Swagger Docs

You can generate new swagger docs with `npm run swagger`. You can view them at `http://localhost:4500/api-docs/` and execute the routes.
