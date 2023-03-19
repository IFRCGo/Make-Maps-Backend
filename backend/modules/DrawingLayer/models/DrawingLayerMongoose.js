import { Disaster } from "./../../Disaster/models/DisasterMongoose.js";
import mongoose from 'mongoose'

/**
 Defines a Mongoose schema for Drawing Layers.
 @typedef {Object} DrawingLayer
 @property {mongoose.Schema.Types.ObjectId} _id - Unique ID of the drawing layer
 @property {mongoose.Schema.Types.ObjectId} disaster - ID of the disaster the drawing layer belongs to
 @property {mongoose.Schema.Types.ObjectId} createdBy - ID of the user who created the drawing layer
 @property {string} featureType - The type of the drawing feature (Polygon, MultiLineString, LineString)
 @property {Object} featureGeoJSON - The GeoJSON object representing the drawing feature
 @property {Date} createdAt - The date and time the drawing layer was created
 @property {Date} updatedAt - The date and time the drawing layer was last updated
 */
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
      //TODO Verify featureGeoJSON is legitimate GeoJSON type
    featureGeoJSON: { type: Object, required: true },
  },
  {
    timestamps: true,
    collection: "Drawing Layer",
    autoCreate: true,
    //    id: false,
  }
);

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
