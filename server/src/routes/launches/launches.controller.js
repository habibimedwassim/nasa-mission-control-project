import {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existsById,
} from '../../models/launches.model.js';

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpSubmitLaunch(req, res) {
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
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const id = +req.params.id;
    if (!existsById(id))
        return res.status(404).json({ message: 'Launch not found !' });
    const aborted = abortLaunch(id);
    return res.status(200).json(aborted);
}
export default { httpGetAllLaunches, httpSubmitLaunch, httpAbortLaunch };
