import express from 'express';
import controller from './launches.controller.js';

const launchesRouter = express.Router();

launchesRouter.get('/', controller.getAllLaunches);

export { launchesRouter };
