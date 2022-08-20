# TS serverless backend

Example repository of a REST serverless pet store API, using typescript and terraform.
The `src` directory contains base configuration for all projects and the existing `packages` in the monorepo:

- `infrastructure`: Where all terraform AWS configuration, setup and implementation lives
- `lambdas`: Where all the lambda handler implementations exist.

In the `_Documentation` folder there can be found the system architecture diagrams as well as the Domain Design diagrams.

## Requirements

- asdf
- nodejs (LTS Gallium)
- terraform (V 1.2.5)
- NX (Latest)

## Setup

The `lambdas` package is where the handler implementation for our AWS Lambda functions lie.
To run it locally using an express server do:

```shell
npm install
npx prisma init
npx prisma generate
npm run dev
```

## Developing

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- This should represent the day-to-day workflow
- this should not list global dependencies

</details>

### Deploying

Give instructions on how to build and release a new version.

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

Always try prioritise a CI/CD pipeline and build artifacts that are optimised generic environments.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- If this uses ci/cd link out to it along with the environments.
- [12 factor apps](https://12factor.net/)
- [Immutable Web App](https://immutablewebapps.org/)
- Make use of badges where possible
  - [circleci status-badges](https://circleci.com/docs/2.0/status-badges)
  - [Github Workflow status badge](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)

</details>

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

Here you should write what are all of the configurations a user can enter when using the project.

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- Note configuration is not secrets.
- Use `.env` and `.env.example`.
- Try to refrain from development and production references - let those values come from the env or the build.

</details>

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- This is sometimes included in the Developing script. This is fine, however if you are working with code that the sysops team is not familiar with, it's a good idea to split this out to make it more convenient for them.

</details>

## Api Reference

You can find the API definition documented in the [Swagger Specification](https://app.swaggerhub.com/apis/TiagoLimaRocha/pet-store-api/1.0.0) page.

## Database

This project uses [Prisma](https://www.prisma.io/) as ORM, setup with the postgresql provider.
The database must be generated first before any usage and subsequent migrations are all done via command line inputs. This open source library also comes with a browser GUI that allows you to manage your data manually.

Here is a list of the most useful commands:

```shell
  npx prisma init # Setup a new Prisma project
  npx prisma generate # Generate artifacts (e.g. Prisma Client)
  npx prisma studio # Browse your data
  
  npx prisma migrate dev --name <migration_name> # Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
  npx prisma migrate deploy # Applies all pending migrations, and creates the database if it does not exist
  npx prisma migrate resolve # Allows you to solve migration history issues in production by marking a failed migration as already applied (supports baselining) or rolled back.
  npx prisma migrate status # Looks up the migrations in /prisma/migrations/* folder and the entries in the _prisma_migrations table and compiles information about the state of the migrations in your database.

  npx prisma db pull # Pull the schema from an existing database, updating the Prisma schema
  npx prisma db push # Push the Prisma schema state to the database
  prisma db execute --file <filename> --schema schema.prisma # Applies a SQL script to the database without interacting with the Prisma migrations table.
```
