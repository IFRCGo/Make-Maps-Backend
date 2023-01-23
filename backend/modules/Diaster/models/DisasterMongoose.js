//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

export const DisasterSchema = new mongoose.Schema({
    createdBy: String,
    disasterName: String,
    disasterType: [String],
    disasterCoordinates: [Number],
    diasterInformation: String
},{
    collection: 'Disaster',
    autoCreate: true
});

export const Disaster = mongoose.model('Disaster', DisasterSchema);