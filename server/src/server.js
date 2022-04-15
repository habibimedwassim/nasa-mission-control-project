import http from 'http';
import { app } from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

//Defining the server port
const PORT = process.env.PORT || 4000;

await loadPlanetsData();
//Creating the server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on port "${PORT}"...`);
});
