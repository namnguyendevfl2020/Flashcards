
import express from "express";
import { notFound, errorHandler } from "helpers/server/errors";
import cors from 'cors';
import { PUT } from "helpers/server/getMethod";
import { cardsController } from "helpers/server/cards/cards.controller";
const app = express();
app.use(cors());

app.use(PUT, cardsController.update);
app.use(notFound);
app.use(errorHandler);

export default app;
export const config = {
  api: {
    bodyParser: true, 
    externalResolver: true 
  }
};