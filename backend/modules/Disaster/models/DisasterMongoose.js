import mongoose from 'mongoose'

/**

 Defines a Mongoose schema for disasters.
 @typedef {Object} DisasterSchema
 @property {string} _id - Unique ID of the disaster
 @property {String} disasterName - The name of the disaster.
 @property {String} disasterType - The type of disaster.
 @property {Date} date - The date of the disaster.
 @property {String} region - The region where the disaster occurred.
 @property {String} [location] - The specific location of the disaster. e.g. Pakistan, UK
 @property {Object} disasterCoordinates - The coordinates of the disaster and type of coordinate.
 @property {String} disasterCoordinates.type - The type of coordinates, which should be "Point".
 @property {Number[]} disasterCoordinates.coordinates - An array of latitude and longitude coordinates.
 @property {String} [disasterInformation] - Additional information about the disaster.
 @property {String} amount_requested - The amount of funding requested for the disaster.
 @property {String} amount_funded - The amount of funding received for the disaster.
 @property {mongoose.Schema.Types.ObjectId} createdBy - The user who created the disaster.
 @property {mongoose.Schema.Types.ObjectId[]} pins - An array of Pin object IDs associated with the disaster.
 @property {mongoose.Schema.Types.ObjectId[]} drawingLayers - An array of DrawingLayer object IDs associated with the disaster.
 @property {Date} [lastSentEmail=Date.now()] - The date when the last email about the disaster was sent.
 @property {mongoose.Schema.Types.ObjectId[]} subscriptions - An array of User object IDs subscribed to the disaster.
 @property {Boolean} [autoCreate=true] - Whether to automatically create the collection in the database if it does not exist.
 @property {Boolean} [timestamps=true] - Whether to automatically add createdAt and updatedAt fields to the schema.
 @property {String} [collection='Disaster'] - The name of the collection in the database.
 */
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
    drawingLayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DrawingLayer",
      },
    ],
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
