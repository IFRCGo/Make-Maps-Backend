import { composeMongoose } from "graphql-compose-mongoose";
import { MapLayer } from "../models/MapLayerMongoose.js";

const customizationOptions = {}; // left it empty for simplicity, described below
export const MapLayerTC = composeMongoose(MapLayer, customizationOptions);
