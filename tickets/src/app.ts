import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@rstickets70/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();
app.set('trust proxy', true); //trust traffic behind ingress nginx proxy

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
