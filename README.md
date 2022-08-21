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
- Docker

## Setup

You will need to install [docker](https://docs.docker.com/get-docker/) and [asdf](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf) in order to configure this project. Afterwards add and install the necessary plugins:

```shell
asdf plugin add terraform, terraform-docs, awscli, nodejs
asdf plugin install terraform 1.2.5
asdf plugin install terraform-docs 0.16.0
asdf plugin install nodejs lts-gallium
```

If you're running on the latest AArch MacOS architecture you might need to run this workaround in order to be able to use terraform commands:

```shell
if [[ `which sysctl && sysctl -n machdep.cpu.brand_string` == 'Apple M1' ]]; then
    # Mac M1's different arch workaround.
  export ASDF_HASHICORP_OVERWRITE_ARCH=amd64
fi
```

## Developing

### Setting up Dev

With docker up and running you must first instanciate postgres:

```shell
docker pull postgres
docker run --name pet-store--postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

In the command given above, 

PostgreSQL is the name of the Docker Container.
-e POSTGRES_USER is the parameter that sets a unique username to the Postgres database.
-e POSTGRES_PASSWORD is the parameter that allows you to set the password of the Postgres database.
-p 5432:5432 is the parameter that establishes a connection between the Host Port and Docker Container Port. In this case, both ports are given as 5432, which indicates requests sent to the Host Ports will automatically redirect to the Docker Container Port. In addition, 5432 is also the same port where PostgreSQL will be accepting requests from the client.
-v is the parameter that synchronizes the Postgres data with the local folder. This ensures that Postgres data will be safely present within the Home Directory even if the Docker Container is terminated (optional ` -v /data:/var/lib/postgresql/data`).
-d is the parameter that runs the Docker Container in the detached mode, i.e., in the background. If you accidentally close or terminate the Command Prompt, the Docker Container will still run in the background.
postgres is the name of the Docker image that was previously downloaded to run the Docker Container.


The `lambdas` package is where the handler implementation for our AWS Lambda functions lie.
To run it locally using an express server do:

```shell
npm install
npx prisma init
npx prisma generate
npm run dev
```

In the above sequence of commands we install all the dependencies, initialise prisma and generate the database, and finally we start the express server.

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
npx prisma init                                               # -> Setup a new Prisma project
npx prisma generate                                           # -> Generate artifacts (e.g. Prisma Client)
npx prisma studio                                             # -> Browse your data

npx prisma migrate dev --name <migration_name>                # -> Create migrations from your Prisma schema, apply them to the database,
                                                              # generate artifacts (e.g. Prisma Client)
npx prisma migrate deploy                                     # -> Applies all pending migrations, and creates the database if it does not exist
npx prisma migrate resolve                                    # -> Allows you to solve migration history issues in production by marking a failed
                                                              # migration as already applied (supports baselining) or rolled back.
npx prisma migrate status                                     # -> Looks up the migrations in /prisma/migrations/* folder and the entries in the
                                                              # _prisma_migrations table and compiles information about the state of the migrations
                                                              # in your database.

npx prisma db pull                                            # -> Pull the schema from an existing database, updating the Prisma schema
npx prisma db push                                            # -> Push the Prisma schema state to the database
prisma db execute --file <filename> --schema schema.prisma    # -> Applies a SQL script to the database without interacting with the Prisma
                                                              # migrations table.
```
