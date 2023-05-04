## Prerequisites

node: v18.12.1
npm: 8.19.2

In order to run this project copy the .env.sample file and place it into a .env file
Be careful with the the configuration set for TypeOrm

## Getting Started

->DB
docker-compose up -d
->API
yarn install
yarn start
->UI
yarn install
yarn start

## Improvements

- Don't return entities ids from db
- Add test suite
- Implement redis as exchange rate cache
- Exchange rate TTL could be configurable from env var.

## Api example

Get Exchange Rates

```
curl --location --request GET 'http://localhost:3000/exchange-rates'
```

Create Wallet

```
curl --location --request POST 'http://localhost:3001/wallets' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address": "0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0",
    "isFavorite": true
}'
```

Get Wallets

```
curl --location --request GET 'http://localhost:3001/wallets' \
--data-raw ''
```

Update Wallet

```
curl --location --request PATCH 'http://localhost:3001/wallets/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isFavorite": false
}'
```

Get Wallet Details

```
curl --location --request GET 'http://localhost:3001/wallets/0x60445cf6902c49fc9a0DdDCD207Bb4C73229Dec3'
```
