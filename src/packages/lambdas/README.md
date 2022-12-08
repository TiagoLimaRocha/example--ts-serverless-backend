# TS Pet Store API

This project illustrates an example API written in typescript and provisioned within AWS, making use of [DDD](https://alejandrome.github.io/ddd-essentials-1) and applying the [Repository Pattern](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design).

## Development

Uses:

- [asdf](https://asdf-vm.com)
- [docker](https://docker.com/)
- [nx](https://nx.dev/)
- [jest](https://nx.dev/packages/jest)
- [prisma](https://www.prisma.io/)
- [terraform](https://www.terraform.io/language)
- [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [typescript](https://www.typescriptlang.org/)
- [node](https://nodejs.org/en/)

```bash
# Add asdf dependencies
asdf plugin add nodejs
asdf plugin add terraform

# Install asdf dependencies
asdf install nodejs lts-gallium
asdf install terraform 1.2.5

# Pull postgres image and launch docker container
docker pull postgres

docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres

# Install dependencies
npm install

# Start dev server
npm run dev

####################
# Other scripts of interest
####################

# Run formatter
npm run format

# Run tests
npm run test
```

## Environment Variables

To run this project, please copy the `.env.example` to `.env` and fill out the values as needed.

[comment]: # 'See https://ohmybuck.com/2020-05-23-14-48-env-file-checker'

## Deployment

To deploy this project run

```bash
npm run deploy
```

## Api Reference

You can find the API definition documented in the [Swagger Specification](https://app.swaggerhub.com/apis/TLRPersonalSpace/PetStore/1.1.0) page.

And [here](https://www.getpostman.com/collections/7f33955632e654d9c37d) is the Postman collection.

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

## Resources

Recommended further reading

- [Creating a local testing environment for AWS Lambda with Express and Typescript](https://medium.com/doorr/creating-a-local-testing-environment-for-aws-lambda-with-express-and-typescript-90984a1d7071)
- [Unit testing with Prisma](https://www.prisma.io/docs/guides/testing/unit-testing)
- [Prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud#update)
- [Swagger API Spec](https://app.swaggerhub.com/apis/TLRPersonalSpace/PetStore/1.1.0#/)
- [OpenAPI Guide](https://swagger.io/docs/specification/about/)
- [DDD](https://alejandrome.github.io/ddd-essentials-1)
- [Repository Pattern](https://dev.to/fyapy/repository-pattern-with-typescript-and-nodejs-25da)

## Directories and Files of Interest

| Directory            | Description                                             |
| -------------------- | ------------------------------------------------------- |
| .github/workflows    | CD process.                                             |
| src                  | All Source files                                        |
| src/assets           | All general assets (i.e. api spec)                      |
| src/environments     | All nx environments                                     |
| src/handlers         | All handler services                                    |
| src/handlers         | All AWS Lambda handler services                         |
| src/libs             | All general use code                                    |
| src/middleware       | All general use middleware                              |
| src/plugins          | All plugin installations                                |
| src/prisma           | All prisma migrations and schema                        |
| src/repositories     | All domain repositories                                 |

---

## TODO

- [x] Project setup
- [x] Documentation
- [x] Prisma installation & setup
- [x] Custom local lambda Express server setup
- [x] API Specification
- [x] Winston logger setup
- [x] Custom error handler setup
- [x] Custom exeption creation
- [x] Postman collection setup
- [x] Configured Jest
- [x] Dinamically generate express routes from the OpenApi Specification document :rocket:

---

- [x] User Repository Implementation
- [x] User Repository Unit Tests
- [x] User Service Implementation
- [x] User Service Unit Tests

---

- [ ] Auth Repository Implementation
- [ ] Auth Repository Unit Tests
- [ ] Auth Service Implementation
- [ ] Auth Service Unit Tests

---

- [ ] Pet Repository Implementation
- [ ] Pet Repository Unit Tests
- [ ] Pet Service Implementation
- [ ] Pet Service Unit Tests

---

- [ ] Order Repository Implementation
- [ ] Order Repository Unit Tests
- [ ] Order Service Implementation
- [ ] Order Service Unit Tests

---

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## License

Released under MIT License
