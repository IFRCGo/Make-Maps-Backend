//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const DisasterSchema = mongoose.Schema(
  {
    disasterName: { type: "String", required: true },
    disasterType: { type: "String", required: true },
    date: { type: Date, required: true },
    region: { type: "String", required: true },
    location: { type: "String" },
    disasterCoordinates: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    disasterInformation: { type: "String" },
    amount_requested: { type: String, required: true },
    amount_funded: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin",
      },
    ],
    texts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Text",
      },
    ],
    mapLayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MapLayer",
      },
    ],
    lastUpdated: { type: Date, default: Date.now() },
    lastSentEmail: { type: Date, default: Date.now() },

    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    collection: "Disaster",
    autoCreate: true,
  }
);
DisasterSchema.index({ disasterCoordinates: "2dsphere" });

export const Disaster = mongoose.model("Disaster", DisasterSchema);

// test data

/* 


{
   "records":[
      {
         "disasterName":"Hurricane Maria",
         "disasterType":"Natural Disaster",
         "date":"2017-09-20",
         "region":"Caribbean",
         "location":"Puerto Rico",
         "disasterCoordinates":{
            "type":"Point",
            "coordinates":[
              18.46633000,
               -66.10572000,
               
            ]
         },
         "disasterInformation":"Category 4 storm that caused widespread destruction",
         "amount_requested":"1000000",
         "amount_funded":"800000",
         "createdBy": "63d10ad4e30540f8a78a183d",
      },
      {
         "disasterName":"Wildfire in California",
         "disasterType":"Natural Disaster",
         "date":"2018-11-08",
         "region":"West Coast",
         "location":"Paradise, CA",
         "disasterCoordinates":{
            "type":"Point",
            "coordinates":[
               
               -121.633759,
               39.767380,
            ]
         },
         "disasterInformation":"Devastating wildfire that destroyed thousands of homes",
         "amount_requested":"2000000",
         "amount_funded":"1800000",
         "createdBy": "63d10ad4e30540f8a78a183d",

      }
   ]
}

*/
