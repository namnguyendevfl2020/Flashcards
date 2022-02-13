// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
require('dotenv').config();
const path = require("path");

//use these ones when running locally
const {
  DATABASE_URL_DEVELOPMENT,
  DATABASE_URL_PRODUCTION,
  DATABASE_URL_TEST,
  DATABASE_URL_PREVIEW,
} = process.env;

//use next.config.ts when the app is deployed
const DBURL = serverRuntimeConfig.env.DATABASE_URL;
 module.exports = {
   development: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_DEVELOPMENT || DBURL,
     migrations: {
       directory: path.join(__dirname, "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "db", "seeds"),
     },
    //  debug: !!DEBUG,
   },
   test: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_TEST ,
     migrations: {
       directory: path.join(__dirname, "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "db", "seeds"),
     },
    //  debug: !!DEBUG,
   },
   preview: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_PREVIEW,
     migrations: {
       directory: path.join(__dirname, "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "db", "seeds"),
     },
    //  debug: !!DEBUG,
   },
   production: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_PRODUCTION || DBURL,
     migrations: {
       directory: path.join(__dirname, "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "db", "seeds"),
     },
    //  debug: !!DEBUG,
   },
 };
 