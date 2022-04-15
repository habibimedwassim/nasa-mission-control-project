// Imports from npm packages;
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

// Imports from files
import { planetsRouter } from './routes/planets/planets.router.js';
import { launchesRouter } from './routes/launches/launches.router.js';

// Defining the express app
const app = express();

// Middleware confs
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(
    express.static(
        path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')
    )
);
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
    res.sendFile(
        path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            '..',
            'public',
            'index.html'
        )
    );
});
export { app };
