import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const planetsSchema = new Schema({
    keplerName: {
        type: String,
        required: true,
    },
});

export default model('Planet', planetsSchema);
