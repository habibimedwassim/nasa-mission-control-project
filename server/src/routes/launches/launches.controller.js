import {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existsById,
} from '../../models/launches.model.js';
import { getPagination } from '../../utils/query.js';

async function httpGetAllLaunches(req, res) {
    console.log(req.query);
    const result = getPagination(req.query);
    console.log(`skip(page):${result.skip}..limit:${result.limit}..`);
    const launches = await getAllLaunches(result.skip, result.limit);
    return res.status(200).json(launches);
}

async function httpSubmitLaunch(req, res) {
    const launch = req.body;
    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.target ||
        !launch.launchDate
    ) {
        return res.status(400).json({ error: 'Missing launch property !!' });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (launch.launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({ error: 'Please enter a valid date !!' });
    }
    await addNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const id = +req.params.id;
    const exists = await existsById(id);
    if (!exists) return res.status(404).json({ error: 'Launch not found !' });
    const aborted = await abortLaunch(id);
    if (!aborted) {
        res.status(400).json({
            error: 'Launch not aborted !',
        });
    }
    return res.status(200).json({
        ok: true,
    });
}
export default { httpGetAllLaunches, httpSubmitLaunch, httpAbortLaunch };
