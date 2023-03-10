import { Disaster } from "./../../Disaster/models/DisasterMongoose.js";
import mongoose from 'mongoose'

const TextSchema = mongoose.Schema(
  {
    disaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
    text: { type: "String", required: true },
    date: { type: Date, default: Date.now, required: true },
    textCoordinates: {
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
    timestaps: true,
    collection: "Text",
    autoCreate: true,
  }
);
TextSchema.index({ textCoordinates: "2dsphere" });
TextSchema.pre("save", async function (next) {
  await Disaster.updateOne(
    { _id: this.disaster },
    { $push: { texts: this._id }, $set: { lastUpdated: new Date() } }
  );
  next();
});
export const Text = mongoose.model("Text", TextSchema);
