import { PinTC } from "../schema/PinSchema.js";
import { Disaster } from "./../../Disaster/models/DisasterMongoose.js";
import { Pin } from "../models/PinMongoose.js";
import mongoose from "mongoose";
import { GraphQLObjectType } from "graphql";
export const pinQuery = {
  pinById: PinTC.mongooseResolvers.findById(),
  pinByIds: PinTC.mongooseResolvers.findByIds(),
  pinOne: PinTC.mongooseResolvers.findOne(),
  pinMany: PinTC.mongooseResolvers.findMany(),
  pinDataLoader: PinTC.mongooseResolvers.dataLoader(),
  pinDataLoaderMany: PinTC.mongooseResolvers.dataLoaderMany(),
  pinByIdLean: PinTC.mongooseResolvers.findById({ lean: true }),
  pinByIdsLean: PinTC.mongooseResolvers.findByIds({ lean: true }),
  pinOneLean: PinTC.mongooseResolvers.findOne({ lean: true }),
  pinManyLean: PinTC.mongooseResolvers.findMany({ lean: true }),
  pinDataLoaderLean: PinTC.mongooseResolvers.dataLoader({
    lean: true,
  }),
  pinDataLoaderManyLean: PinTC.mongooseResolvers.dataLoaderMany({
    lean: true,
  }),
  pinCount: PinTC.mongooseResolvers.count(),
  pinConnection: PinTC.mongooseResolvers.connection(),
  pinPagination: PinTC.mongooseResolvers.pagination(),
};

const PinCustomPayload = new GraphQLObjectType({
  name: "PinRemoveOneCustomPayload",
  fields: {
    record: { type: PinTC.getType() },
  },
});

export const pinMutation = {
  pinCreateOne: PinTC.mongooseResolvers.createOne(),
  pinCreateMany: PinTC.mongooseResolvers.createMany(),
  pinUpdateById: PinTC.mongooseResolvers.updateById(),
  pinRemoveOne: PinTC.mongooseResolvers.removeOne(),
  pinRemoveOneCustom: {
    type: PinCustomPayload,
    args: {
      _id: "MongoID!",
    },
    resolve: async (_, args) => {
      const removedPin = await Pin.findByIdAndRemove(args._id);
      if (removedPin) {
        await Disaster.findByIdAndUpdate(
          { _id: removedPin.disaster },
          { $pull: { pins: removedPin._id } }
        );
      }
      return { record: removedPin };
    },
  },

  PinUpdateByIdCustom: {
    type: PinCustomPayload,
    args: {
      _id: "MongoID!",
      record: "UpdateByIdPinInput!",
    },
    resolve: async (_, args) => {
      var pin = await Pin.findById(args._id);
      if (pin) {
        pin = await Pin.findByIdAndUpdate(
          { _id: args._id },
          { ...args.record },
          { new: true }
        );
        await Disaster.findByIdAndUpdate(
          { _id: pin.disaster },
          { updatedAt: new Date.now() }
        );
      }
      return { record: pin };
    },
  },

  pinCreateOneCustom: {
    type: PinCustomPayload,
    args: {
      record: "CreateOnePinInput!",
    },
    resolve: async (_, { record }) => {
      const { disaster, pinText, pinCoordinates, createdBy } = record;
      const newPin = new Pin({
        disaster,
        pinText,
        pinCoordinates,
        createdBy,
      });
      const addedPin = await newPin.save();
      await Disaster.updateOne(
        { _id: disaster },
        { $push: { pins: addedPin._id } }
      );
      return { record: addedPin };
    },
  },
};
