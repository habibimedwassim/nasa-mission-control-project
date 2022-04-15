import express from 'express';
import controller from './planets.controller.js';

const planetsRouter = express.Router();

planetsRouter.get('/', controller.getAllPlanets);

export { planetsRouter };
