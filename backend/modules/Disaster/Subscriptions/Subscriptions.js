import { pubsub } from "../../../server.js";
import { PinTC } from "../../Pin/schema/PinSchema.js";
import { Disaster } from "../models/DisasterMongoose.js";

import { DisasterTC } from "../schema/DisasterSchema.js";
import { withFilter } from "graphql-subscriptions";

export const pinUpdatedSubscription = {
  pinUpdated: {
    args: {
      disasterId: "MongoID!",
    },
    type: PinTC,
    subscribe: withFilter(
      () => pubsub.asyncIterator(["PIN_UPDATED"]),
      (payload, variables) => {
        return (
          payload.pinUpdated.disaster.toString() ===
          variables.disasterId.toString()
        );
      }
    ),
  },
};

export const pinAddedSubscription = {
  pinAdded: {
    args: {
      disasterId: "MongoID!",
    },
    type: PinTC,
    subscribe: withFilter(
      () => pubsub.asyncIterator(["PIN_ADDED"]),
      (payload, variables) => {
        return (
          payload.pinAdded.disaster.toString() ===
          variables.disasterId.toString()
        );
      }
    ),
  },
};

export const pinRemovedSubscription = {
  pinRemoved: {
    args: {
      disasterId: "MongoID!",
    },
    type: PinTC,
    subscribe: withFilter(
      () => pubsub.asyncIterator(["PIN_REMOVED"]),
      (payload, variables) => {
        return (
          payload.pinRemoved.disaster.toString() ===
          variables.disasterId.toString()
        );
      }
    ),
  },
};

export const disasterSubscription = {
  disasterSubscription: {
    args: {
      _id: "MongoID!",
    },
    type: DisasterTC,
    resolve: async (_, args) =>
      await Disaster.findById(args._id).populate("pins drawingLayers"),
    subscribe: () => pubsub.asyncIterator(["DISASTER_UPDATED"]),
  },
};
