import { PinTC } from "../schema/PinSchema.js";
import { Disaster } from "./../../Disaster/models/DisasterMongoose.js";
import { Pin } from "../models/PinMongoose.js";
import mongoose from "mongoose";
import { GraphQLObjectType } from "graphql";
import { pubsub } from "../../../server.js";

/**
 * GraphQL query for retrieving and manipulating Pin data.
 * @typedef {Object} PinQuery
 * @property {Function} pinById - graphql-compose-mongoose resolver for retrieving a pin by ID
 * @property {Function} pinByIds - graphql-compose-mongoose resolver for retrieving multiple pins by IDs
 * @property {Function} pinOne - graphql-compose-mongoose resolver for retrieving a single pin
 * @property {Function} pinMany - graphql-compose-mongoose resolver for retrieving multiple pins
 * @property {Function} pinDataLoader - graphql-compose-mongoose resolver for retrieving a pin with DataLoader
 * @property {Function} pinDataLoaderMany - graphql-compose-mongoose resolver for retrieving multiple pins with DataLoader
 * @property {Function} pinByIdLean - graphql-compose-mongoose resolver for retrieving a pin by ID with lean option
 * @property {Function} pinByIdsLean - graphql-compose-mongoose resolver for retrieving pins by IDs with lean option
 * @property {Function} pinOneLean - graphql-compose-mongoose resolver for retrieving a single pin with lean option
 * @property {Function} pinManyLean - graphql-compose-mongoose resolver for retrieving multiple pins with lean option
 * @property {Function} pinDataLoaderLean - graphql-compose-mongoose resolver for retrieving a pin with DataLoader and lean option
 * @property {Function} pinDataLoaderManyLean - graphql-compose-mongoose resolver for retrieving multiple pins with DataLoader and lean option
 * @property {Function} pinCount - graphql-compose-mongoose resolver for counting the number of pins
 * @property {Function} pinConnection - graphql-compose-mongoose resolver for pagination with a connection
 * @property {Function} pinPagination - graphql-compose-mongoose resolver for pagination
 */
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

/**
 * Custom payload type for Pin mutations
 * @typedef {Object} PinCustomPayload
 * @property {Object} record.type - The PinTC schema type
 */
const PinCustomPayload = new GraphQLObjectType({
  name: "PinRemoveOneCustomPayload",
  fields: {
    record: { type: PinTC.getType() },
  },
});

/**
 * GraphQL mutations for creating, updating, and removing Pin(s)
 * @typedef {Object} PinMutation
 * @property {Function} pinCreateOne - graphql-compose-mongoose resolver for creating one pin
 * @property {Function} pinCreateMany - graphql-compose-mongoose resolver for creating multiple pins
 * @property {Function} pinUpdateById - graphql-compose-mongoose resolver for updating a pin by ID
 * @property {Function} pinRemoveOne - graphql-compose-mongoose resolver for removing one pin
 * @property {Function} pinCreateOneCustom - Custom resolver for creating one pin and publishing an event for subscribers
 * @property {Function} PinUpdateByIdCustom - Custom Mongoose resolver for updating a pin by ID and publishing an event for subscribers
 * @property {Function} pinRemoveOneCustom - Custom Mongoose resolver for removing one pin and publishing an event for subscribers
 * @property {Object} pinCreateOneCustom.args - Arguments for the custom create one mutation
 * @property {Object} pinCreateOneCustom.args.record - Input type for the custom create one mutation
 * @property {Function} pinCreateOneCustom.resolve - Resolver function for the custom create one mutation
 * @property {Object} PinUpdateByIdCustom.args - Arguments for the custom update by ID mutation
 * @property {Object} PinUpdateByIdCustom.args._id - ID of the pin to be updated
 * @property {Object} PinUpdateByIdCustom.args.record - Input type for the custom update by ID mutation
 * @property {Function} PinUpdateByIdCustom.resolve - Resolver function for the custom update by ID mutation
 * @property {Object} pinRemoveOneCustom.args - Arguments for the custom remove one mutation
 * @property {Object} pinRemoveOneCustom.args._id - ID of the pin to be removed
 * @property {Function} pinRemoveOneCustom.resolve - Resolver function for the custom remove one mutation
 */
export const pinMutation = {
  pinCreateOne: PinTC.mongooseResolvers.createOne(),
  pinCreateMany: PinTC.mongooseResolvers.createMany(),
  pinUpdateById: PinTC.mongooseResolvers.updateById(),
  pinRemoveOne: PinTC.mongooseResolvers.removeOne(),
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
      pubsub.publish("PIN_ADDED", {
        pinAdded: addedPin,
        disasterId: disaster,
      });

      return { record: addedPin };
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
          { updatedAt: new Date() }
        );
        pubsub.publish("PIN_UPDATED", {
          pinUpdated: pin,
          disasterId: pin.disaster,
        });
      }
      return { record: pin };
    },
  },
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
        pubsub.publish("PIN_REMOVED", {
          pinRemoved: removedPin,
          disasterId: removedPin.disaster,
        });
      }

      return { record: removedPin };
    },
  },
};
