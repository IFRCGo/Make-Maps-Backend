//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const DrawingLayerSchema = mongoose.Schema(
  {
    disaster: {
      type: mongoose.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    featureType: {
      type: String,
      enum: ["Polygon", "MultiLineString", "LineString"],
      required: true,
    },
    featureGeoJSON: { type: Object, required: true },
  },
  {
    timestamps: true,
    collection: "Map Layer",
    autoCreate: true,
    //    id: false,
  }
);
DrawingLayerSchema.pre("save", async function (next) {
  await Disaster.updateOne(
    { _id: this.disaster },
    { $push: { drawingLayers: this._id }, $set: { lastUpdated: new Date() } }
  );
  next();
});
export const DrawingLayer = mongoose.model("DrawingLayer", DrawingLayerSchema);
/* 
//example data layer
const mapLayer = new MapLayer({
  disaster: "5f9d41f2f3f1c8f2b7e1c2e3",
  createdBy: "5f9d41f2f3f1c8f2b7e1c2e3",
  layerName: "Buildings",
  layerType: "GeoJSON",
  layerConfig: {
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-74.041847, 40.694],
                [-73.98, 40.7],
                [-73.95, 40.7],
                [-73.94, 40.7],
                [-73.94, 40.69],
                [-74.041847, 40.694],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-74.03, 40.68],
                [-74.01, 40.68],
                [-74.01, 40.69],
                [-74.03, 40.69],
                [-74.03, 40.68],
              ],
            ],
          },
        },
      ],
    },
  },
});
 */
