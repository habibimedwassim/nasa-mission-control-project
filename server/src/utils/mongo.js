import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
/**
 * defining the name
 * and the url of our mongo database
 */
const dbName = 'nasa';
const MONGO_URL = 'mongodb://localhost:27017/';

mongoose.Promise = global.Promise;
// Created the connection to mongo database

async function connectDatabase() {
    await mongoose
        .connect(MONGO_URL)
        .then(() => {
            console.log(`Connected to ${dbName}`);
        })
        .catch((err) => {
            console.log(err);
        });
}
async function disconnectDatabase() {
    await mongoose
        .disconnect(MONGO_URL)
        .then(() => {
            console.log(`Disconnected ${dbName}`);
        })
        .catch((err) => {
            console.log(err);
        });
}
export default { connectDatabase, disconnectDatabase };
