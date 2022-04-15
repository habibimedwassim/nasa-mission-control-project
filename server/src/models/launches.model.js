const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 12, 2023'),
    target: 'Kepler-442 b',
    customers: ['HMW', 'NASA'],
    upcoming: true,
    success: true,
};
launches.set(launch.flightNumber, launch);
function existsById(id) {
    return launches.has(id);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customers: ['HMW', 'NASA'],
            upcoming: true,
            success: true,
        })
    );
}

function abortLaunch(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
export { existsById, getAllLaunches, addNewLaunch, abortLaunch };
