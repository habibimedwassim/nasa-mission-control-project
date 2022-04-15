// Imports from npm packages;
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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
app.use(
    express.static(
        path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')
    )
);
app.use(planetsRouter);
app.get('/', (req, res) => {
    res.sendFile(
        path.dirname(fileURLToPath(import.meta.url)),
        '..',
        'public',
        'index.html'
    );
});
export { app };
