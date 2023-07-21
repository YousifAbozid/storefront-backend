# Storefront Backend Project

This repo is a backend project for a storefront. It uses Nodejs, Expressjs, Typescript and postgresql.

## Getting Started

To get started, clone this repo and run `npm install` in your terminal.

## Setting up the Database

To set up the database, run `npm run create-dev-db` in your terminal, This command runs a script that uses db-migrate to create a new database called `storefront-backend` and then run `npm run migrate-up-dev` in your terminal to let the migrations create the tables in your database.

PS: This script assumes you have installed `postgres` on your local machine and the server is running.

## Running the Server

To run the server in dev mode, run `npm run dev` in your terminal.
To run the server in prod mode, run `npm start` in your terminal.

### Ports

The application runs on port `3000` with database on `5432`.

## Running in Production

To run the server in production, run `npm run build` in your terminal. Then run `npm start` in your terminal.

## Running the Tests

To run the tests, run `npm test` in your terminal.

## API Documentation

The database schema and the API route information can be found in the [REQUIREMENTS.md](REQUIREMENTS.md).

## Environment Variables

You will need to create a `.env` file in the root directory of the project. You can find the environment variables you need to start the server here: [.env.example](.env.example)
