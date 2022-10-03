# TS Pet Store API

---

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

## Resources

Recommended further reading

- [Creating a local testing environment for AWS Lambda with Express and Typescript](https://medium.com/doorr/creating-a-local-testing-environment-for-aws-lambda-with-express-and-typescript-90984a1d7071)
- [Unit testing with Prisma](https://www.prisma.io/docs/guides/testing/unit-testing)
- [Prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud#update)
- [Swagger API Spec](https://app.swaggerhub.com/apis/TiagoLimaRocha/pet-store-api/1.0.0#/user/createUser)
- [DDD](https://alejandrome.github.io/ddd-essentials-1)
- [Repository Pattern](https://dev.to/fyapy/repository-pattern-with-typescript-and-nodejs-25da)


## Directories and Files of Interest

| Directory             | Description      |
| --------------------- | ---------------- |
| .github/workflows     | CD process.      |
| src                   | All Source files |
| src/assets            | All general assets (i.e. api spec) |
| src/environments      | All nx environments |
| src/handlers          | All handler services |
| src/handlers/express  | All express handler services for development purposes |
| src/handlers/lambda   | All AWS Lambda handler services for production purposes |
| src/libs              | All general use code |
| src/libs/errors       | All general use Errors/Exceptions |
| src/libs/middleware   | All general use middleware |
| src/libs/utils        | All general use helper methods |
| src/plugins           | All plugin installations |
| src/plugins/express   | Express server initialisation |
| src/plugins/prisma    | Prisma client and mock singleton |
| src/plugins/winston   | Winston client |
| src/prisma            | All prisma migrations and schema |
| src/repository        | All domain repositories |

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
---
- [x] User Repository Implementation
- [ ] User Repository Unit Tests
- [x] User Service Implementation
- [ ] User Service Unit Tests
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