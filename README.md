Boilerplate no longer maintained!

<img src='./public/assets/images/logo.svg' alt='Next.js Template Logo' width='48px'/>

# create-typedef-app

![CodeQl Badge](https://github.com/stephenasuncionDEV/create-typedef-app/actions/workflows/codeql-analysis.yml/badge.svg) ![DockerHub Badge](https://github.com/stephenasuncionDEV/create-typedef-app/actions/workflows/docker-deployment.yml/badge.svg)

create-typedef-template is a full-stack web application template inspired by [create-t3-app](https://github.com/t3-oss/create-t3-app) that contains the following technology stack:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://typescriptlang.org/)
- [ChakraUI](https://chakra-ui.com/)
- [NextAuth.js](https://next-auth.js.org/) (Email, Guest, and Web3 Login)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Redux](https://redux.js.org/)
- [tRPC](https://trpc.io/) / or / [Apollo GraphQL](https://www.apollographql.com/) (Type-safe)

## Branches

`_tRPC` (default) - branch that utilizes tRPC in place of Apollo GraphQL for the handling of RPC requests.

`_ApolloGQL` - branch that uses Apollo GraphQL for the handling of RPC (remote procedure call) requests.

> Note: Read [CONTRIBUTING.md](https://github.com/stephenasuncionDEV/create-typedef-app/blob/main/CONTRIBUTING.md) before submitting a pull request.

## Preview

![](public/assets/images/preview-one.png)

![](public/assets/images/preview-two.png)

## How to use

Go to [create-typedef-app repository](https://github.com/stephenasuncionDEV/create-typedef-app), and click `Use this template`.

> Note: If you want to use one of the branches just clone it and merge it to main locally.

### Configurations

GitHub Actions Secrets

```
DOCKER_HUB_USERNAME
DOCKER_HUB_REPOSITORY
DOCKER_HUB_ACCESS_TOKEN
```

Environment Variable Example

- [.env.local](https://github.com/stephenasuncionDEV/create-typedef-app/blob/main/.env.local.example)

## Updating Prisma

To extend any prisma models, run `yarn prisma` to generate a new schema.

> Note: You may need to reload your IDE for changes to occur.

## Updating GraphQL Types

Ignore this if you are using `tRPC`.

To updated grapql types, run `yarn graphql:compile` or `yarn graphql:watch`. Files will get generated to `@/graphql/types`.

> Note: Delete the `types` folder inside the `src/graphql` before generating a new one.

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FstephenasuncionDEV%2Fcreate-typedef-app&env=APP_NAME,SALT_KEY&envDescription=https%3A%2F%2Fgithub.com%2FstephenasuncionDEV%2Fcreate-typedef-app%2Fblob%2Fmain%2F.env.local.example&project-name=create-typedef-app&repo-name=create-typedef-app&demo-title=create-typedef-app&demo-description=A%20statically%20generated%20template%20for%20my%20go-to%20tech%20stack)

## License

[MIT](https://github.com/stephenasuncionDEV/create-typedef-app/blob/main/LICENSE)
