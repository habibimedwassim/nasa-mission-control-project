const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 12, 2023'),
    destination: 'Kepler-442 b',
    customer: ['HMW', 'NASA'],
    upcoming: true,
    success: true,
};

const launch2 = {
    flightNumber: 101,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 12, 2023'),
    destination: 'Kepler-442 b',
    customer: ['HMW', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);
launches.set(launch2.flightNumber, launch2);

export { launches };
