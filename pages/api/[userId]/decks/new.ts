
import express from "express";
import { notFound, errorHandler } from "helpers/server/errors";
import cors from 'cors';
import { decksController } from "helpers/server/decks/decks.controller";
import { POST } from "helpers/server/getMethod";
const app = express();
app.use(cors());

app.use(POST, decksController.create);
app.use(notFound);
app.use(errorHandler);

export default app;
export const config = {
  api: {
    bodyParser: true, 
    externalResolver: true 
  }
};