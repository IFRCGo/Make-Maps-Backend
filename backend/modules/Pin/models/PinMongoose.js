import mongoose from 'mongoose'
import { Disaster } from "./../../Disaster/models/DisasterMongoose.js";

/**

 Mongoose schema for Pins.
 @typedef {object} PinSchema
 @property {string} pinText - The text associated with the pin.
 @property {Object} pinCoordinates - The coordinates of the pin.
 @property {string} pinCoordinates.type - The type of the coordinates.
 @property {Array} pinCoordinates.coordinates - The coordinates.
 @property {mongoose.Schema.Types.ObjectId} createdBy - The user who created the pin.
 */
const PinSchema = mongoose.Schema(
  {
    disaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
    pinText: { type: String },
    pinCoordinates: {
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Pin",
    autoCreate: true,
  }
);
PinSchema.index({ pinCoordinates: "2dsphere" });
// PinSchema.pre("save", async function (next) {
//   await Disaster.updateOne(
//     { _id: this.disaster },
//     { $push: { pins: this._id } }
//   );
//   next();
// });
export const Pin = mongoose.model("Pin", PinSchema);

/*

{
   "records":[
      {
         "disaster":"63d10b119e34b211f344328f",
         "pinText":"pin text",
         "pinCoordinates":{
            "type":"Point",
            "coordinates":[
              18.46633000,
               -66.10572000,
               
            ]
         },
         "createdBy": "63d10ad4e30540f8a78a1840",
      },
   
   ]
}
*/
