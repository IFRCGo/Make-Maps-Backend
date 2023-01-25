import { composeMongoose } from "graphql-compose-mongoose";
import { Text } from "../models/TextMongoose.js";

const customizationOptions = {}; // left it empty for simplicity, described below
export const TextTC = composeMongoose(Text, customizationOptions);
