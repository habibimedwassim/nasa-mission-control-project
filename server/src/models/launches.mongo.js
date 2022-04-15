import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const launchesSchema = new Schema(
    {
        flightNumber: {
            type: Number,
            required: true,
        },
        mission: {
            type: String,
            requires: true,
        },
        rocket: {
            type: String,
            required: true,
        },
        launchDate: {
            type: Date,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        customers: [String],
        upcoming: {
            type: Boolean,
            default: true,
        },
        success: {
            type: Boolean,
            default: true,
        },
    },
    { timestamp: true }
);

export default model('Launch', launchesSchema);
