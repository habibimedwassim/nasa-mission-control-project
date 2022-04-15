// Imports from npm packages;
import express from 'express';
import cors from 'cors';

// Imports from files
import { planetsRouter } from './routes/planets/planets.router.js';

// Defining the express app
const app = express();

// Middleware confs
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
app.use(express.json());
app.use(planetsRouter);

export { app };
