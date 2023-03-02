import { composeMongoose } from "graphql-compose-mongoose";
import { DrawingLayer } from "../models/DrawingLayerMongoose.js";

const customizationOptions = {}; // left it empty for simplicity, described below
export const DrawingLayerTC = composeMongoose(
  DrawingLayer,
  customizationOptions
);
