import { composeMongoose } from 'graphql-compose-mongoose';
import { User } from '../models/UserMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const UserTC = composeMongoose(User, customizationOptions);