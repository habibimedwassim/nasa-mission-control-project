import { getAllPlanets } from '../../models/planets.model.js';

async function httpGetAllPlanets(req, res) {
    return await res.status(200).json(await getAllPlanets());
}

export default { httpGetAllPlanets };
