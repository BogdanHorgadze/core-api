## Running the app

```bash
# database
$ npm run db:start

# backend
$ npm i
$ npm run dev
```

## Migrations
```bash
$ npm run typeorm:run-migrations 
$ npm run typeorm:generate-migration -n=Name 
$ npm run typeorm:create-migration -n=Name 
$ npm run typeorm:revert-migration 
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
