import { composeMongoose } from "graphql-compose-mongoose";
import { Pin } from "../models/PinMongoose.js";

const customizationOptions = {}; // left it empty for simplicity, described below
export const PinTC = composeMongoose(Pin, customizationOptions);
