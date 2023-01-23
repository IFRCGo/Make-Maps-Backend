import { composeMongoose } from 'graphql-compose-mongoose';
import { Disaster } from '../models/DisasterMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const DisasterTC = composeMongoose(Disaster, customizationOptions);