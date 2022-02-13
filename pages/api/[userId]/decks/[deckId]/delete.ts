
import express from "express";
import { notFound, errorHandler } from "helpers/server/errors";
import cors from 'cors';
import { decksController } from "helpers/server/decks/decks.controller";
import { _DELETE } from "helpers/server/getMethod";
const app = express();
app.use(cors());
app.use(_DELETE, decksController._delete);
app.use(notFound);
app.use(errorHandler);

export default app;
export const config = {
  api: {
    bodyParser: true, // set to true by default which parses request bodies
    externalResolver: true // sets whether the route is handled by something like Express 
  }
};