import launchesDb from './launches.mongo.js';
import planetsDb from './planets.mongo.js';

const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 12, 2023'),
    target: 'Kepler-296 f',
    customers: ['HMW', 'NASA'],
    upcoming: true,
    success: true,
};
saveLaunch(launch);
async function existsById(id) {
    return await launchesDb.findOne({ flightNumber: id });
}
async function getlatestFlightNumber() {
    const latestLaunch = await launchesDb.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}
async function getAllLaunches() {
    return await launchesDb.find(
        {},
        {
            _id: 0,
            __v: 0,
        }
    );
}

async function saveLaunch(launch) {
    const planet = await planetsDb.findOne({ keplerName: launch.target });
    if (!planet) {
        throw new Error('No Matching Planet Was Found!');
    }
    await launchesDb.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        { upsert: true }
    );
}
async function addNewLaunch(launch) {
    const latestFlightNumber = (await getlatestFlightNumber()) + 1;
    const newlaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['HMW', 'NASA'],
        upcoming: true,
        success: true,
    });
    await saveLaunch(newlaunch);
}

async function abortLaunch(id) {
    return await launchesDb.updateOne(
        {
            flightNumber: id,
        },
        { upcoming: false, success: false }
    );
}

export { existsById, getAllLaunches, addNewLaunch, abortLaunch };
