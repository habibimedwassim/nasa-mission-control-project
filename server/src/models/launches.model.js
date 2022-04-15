import launchesDb from './launches.mongo.js';
import planetsDb from './planets.mongo.js';
import axios from 'axios';
import { getPagination } from '../utils/query.js';

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const DEFAULT_FLIGHT_NUMBER = 100;
// const launch = {
//     flightNumber: 100, //exists under flight_number
//     mission: 'Kepler Exploration X', //exists under name
//     rocket: 'Explorer IS1', //exists under rocket.name (spaceX api)
//     launchDate: new Date('December 12, 2023'), //date_local
//     target: 'Kepler-296 f', //not applicable
//     customers: ['HMW', 'NASA'], //payloads.customers for each payload
//     upcoming: true, //upcoming
//     success: true, //success
// };
// saveLaunch(launch);
async function populateLaunches() {
    console.log('loading launch data');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1,
                    },
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1,
                    },
                },
            ],
        },
    });
    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Download launch failed!');
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers,
        };
        await saveLaunch(launch);
    }
}
async function loadLaunchData() {
    const found = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if (found) {
        console.log('Launch data already done!');
    } else {
        await populateLaunches();
    }
}
async function findLaunch(filter) {
    return await launchesDb.findOne(filter);
}
async function existsById(id) {
    return await findLaunch({ flightNumber: id });
}
async function getlatestFlightNumber() {
    const latestLaunch = await launchesDb.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}
async function getAllLaunches(skip, limit) {
    return await launchesDb
        .find(
            {},
            {
                _id: 0,
                __v: 0,
            }
        )
        .sort({
            flightNumber: 1,
        })
        .skip(skip)
        .limit(limit);
}

async function saveLaunch(launch) {
    await launchesDb.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        { upsert: true }
    );
}
async function addNewLaunch(launch) {
    const planet = await planetsDb.findOne({ keplerName: launch.target });
    if (!planet) {
        throw new Error('No Matching Planet Was Found!');
    }
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

export {
    loadLaunchData,
    existsById,
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
};
