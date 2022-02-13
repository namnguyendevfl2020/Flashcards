
import express from "express";
import { notFound, errorHandler } from "helpers/server/errors";
import cors from 'cors';
import { cardsController } from "helpers/server/cards/cards.controller";
import { GET } from "helpers/server/getMethod";
const app = express();
app.use(cors());

app.use(GET,cardsController.list);
app.use(notFound);
app.use(errorHandler);

export default app;
export const config = {
  api: {
    bodyParser: true, 
    externalResolver: true 
  }
};