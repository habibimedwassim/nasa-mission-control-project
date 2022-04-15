const API_URL = 'http://localhost:4000';

async function httpGetPlanets() {
    // Load planets and return as JSON.
    const response = await fetch(`${API_URL}/planets`);
    return await response.json();
}

async function httpGetLaunches() {
    // Load launches, sort by flight number, and return as JSON.
    const response = await fetch(`${API_URL}/launches`);
    const fetchedData = await response.json();
    return fetchedData.sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    });
}

async function httpSubmitLaunch(launch) {
    // Submit given launch data to launch system.
    try {
        return await fetch(`${API_URL}/launches`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(launch),
        });
    } catch (error) {
        return {
            ok: false,
        };
    }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
    try {
        return await fetch(`${API_URL}/launches/${id}`, {
            method: 'delete',
        });
    } catch (error) {
        return {
            ok: false,
        };
    }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
