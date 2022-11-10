# Contributing

To get up and running, install the dependencies using yarn.

```
yarn install
```

In the root folder, create a new env file called `.env.local` with environment variables from `.env.local.example`.

## Running the App

Switch to supported node version:
```
yarn node:switch
```

To run the app:

```
yarn dev
```

or with no cache

```
yarn dev:no-cache
```

## Analyzing Bundle

To analyze bundle size:

```
yarn build:analyze
```

## Linting

List of lint commands:

```
yarn lint - default next.js linter
yarn lint:types - Checks type of the whole codebase
yarn lint:format - Checks format of the whole codebase
yarn lint:staged - Runs all 3 commands
```

## Pull Requests

When submitting a pull request, make sure that your branch name is `YOUR_GITHUB_USERNAME/TITLE_OF_PR`

Example: `stephenasuncionDEV/github-update`