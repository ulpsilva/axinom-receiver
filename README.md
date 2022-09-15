# axinom receiver

This is Axinom Receive

## Development

### Run locally

1. create config files using template files
   1. `cp .env.development.local.template .env.development.local`
2. run `npm install`
3. start the database `npm run start:db`
4. run `npm run dev`

### Docker
1. create config files using template files
  1. `cp .env.development.local.template .env.development.local`
2. run `docker-compose up`

## Api Documentation

[http://localhost:3001/api-docs/](http://localhost:3001/api-docs/)

## Production

1. create config files using template files
   1. `cp .env.production.local.template .env.production.local`
2. run `npm run deploy:prod`

# Run Cli
1. `npm run cli:dev`


