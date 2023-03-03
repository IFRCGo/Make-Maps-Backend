//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { Disaster } from "./../../Disaster/models/DisasterMongoose.js";
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
    date: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
    collection: "Drawing Layer",
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
// {
// 	"record": {
// 		"disaster": "63ecff094b66e3ce5e8164e7",
// 		"featureType": "LineString",
// 		"featureGeoJSON": {
// 			"id": "2a3ed2cfe96f9557de21a2081a8bc479",
// 			"type": "Feature",
// 			"properties": {},
// 			"geometry": {
// 				"coordinates": [
// 					[
// 						-66.2052835986335,
// 						18.377405900931464
// 					],
// 					[
// 						-66.13593240234486,
// 						18.377405900931464
// 					],
// 					[
// 						-66.13730569336053,
// 						18.35459745302903
// 					]
// 				],
// 				"type": "LineString"
// 			}
// 		},
// 		"createdBy": "63d10ad4e30540f8a78a183f"
// 	}
// }
