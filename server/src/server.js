// Imports from built-in packages
import http from 'http';
import mongo from './utils/mongo.js';
// Imports from project files
import { app } from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

//Connect to db
await mongo.connectDatabase();
//Defining the server port
const PORT = process.env.PORT || 4000;

await loadPlanetsData();

//Creating the server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on port "${PORT}"...`);
});
