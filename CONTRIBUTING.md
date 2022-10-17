# Contributing

To get up and running, install the dependencies using yarn.

```
yarn install
```

In the root folder, create a new env file called `.env.local` with environment variables from `.env.local.example`.

## Running the App

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
