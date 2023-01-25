//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const DisasterSchema = mongoose.Schema(
  {
    disasterName: { type: "String", required: true },
    diasterType: { type: "String", required: true },
    date: { type: Date, required: true },
    region: { type: "String", required: true },
    location: { type: "String" },
    diasterCoordinates: {
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
    diasterInformation: { type: "String" },
    amount_requested: { type: String, required: true },
    amount_funded: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestaps: true,
    collection: "Disaster",
    autoCreate: true,
  }
);
DisasterSchema.index({ diasterCoordinates: "2dsphere" });

export const Disaster = mongoose.model("Disaster", DisasterSchema);

// test data

/* 


{
   "records":[
      {
         "disasterName":"Hurricane Maria",
         "diasterType":"Natural Disaster",
         "date":"2017-09-20",
         "region":"Caribbean",
         "location":"Puerto Rico",
         "diasterCoordinates":{
            "type":"Point",
            "coordinates":[
              18.46633000,
               -66.10572000,
               
            ]
         },
         "diasterInformation":"Category 4 storm that caused widespread destruction",
         "amount_requested":"1000000",
         "amount_funded":"800000",
         "createdBy": "63d10ad4e30540f8a78a183d",
      },
      {
         "disasterName":"Wildfire in California",
         "diasterType":"Natural Disaster",
         "date":"2018-11-08",
         "region":"West Coast",
         "location":"Paradise, CA",
         "diasterCoordinates":{
            "type":"Point",
            "coordinates":[
               
               -121.633759,
               39.767380,
            ]
         },
         "diasterInformation":"Devastating wildfire that destroyed thousands of homes",
         "amount_requested":"2000000",
         "amount_funded":"1800000",
         "createdBy": "63d10ad4e30540f8a78a183d",

      }
   ]
}

*/
