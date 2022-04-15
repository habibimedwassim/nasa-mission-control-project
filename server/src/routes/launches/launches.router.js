import express from 'express';
import controller from './launches.controller.js';

const launchesRouter = express.Router();

launchesRouter.get('/', controller.httpGetAllLaunches);
launchesRouter.post('/', controller.httpSubmitLaunch);
launchesRouter.delete('/:id', controller.httpAbortLaunch);

export { launchesRouter };
