//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

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

export const Text = mongoose.model("Text", TextSchema);