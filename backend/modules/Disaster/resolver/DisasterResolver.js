import { DisasterTC } from "../schema/DisasterSchema.js";
import { Disaster } from "./../models/DisasterMongoose.js";

import { pubsub } from "../../../server.js";
import { GraphQLObjectType } from "graphql";

/**
 * Custom payload type for Disaster mutations
 * @typedef {Object} DisasterCustomPayload
 * @property {Object} record.type - The DisasterTC schema type.
 */
const DisasterCustomPayload = new GraphQLObjectType({
  name: "DisasterCustomPayload",
  fields: {
    record: { type: DisasterTC.getType() },
  },
});

/**
 * GraphQL query for retrieving and manipulating Disaster data.
 * @typedef {Object} disasterQuery
 * @property {Function} disasterById - graphql-compose-mongoose resolver for retrieving a disaster by ID.
 * @property {Function} disasterByIds - graphql-compose-mongoose resolver for retrieving multiple Disasters by ID.
 * @property {Function} disasterOne - graphql-compose-mongoose resolver for retrieving a single Disaster.
 * @property {Function} disasterMany - graphql-compose-mongoose resolver for retrieving multiple Disasters.
 * @property {Function} disasterDataLoader - graphql-compose-mongoose resolver retrieving a single Disaster using DataLoader.
 * @property {Function} disasterDataLoaderMany - graphql-compose-mongoose resolver for retrieving multiple Disasters using DataLoader.
 * @property {Function} disasterByIdLean - graphql-compose-mongoose resolver for retrieving a Disaster by ID using the lean option.
 * @property {Function} disasterByIdsLean - graphql-compose-mongoose resolver for retrieving multiple Disasters by ID using the lean option.
 * @property {Function} disasterOneLean - graphql-compose-mongoose resolver retrieving a single Disaster using the lean option.
 * @property {Function} disasterManyLean - graphql-compose-mongoose resolver retrieving multiple Disasters using the lean option.
 * @property {Function} disasterDataLoaderLean - graphql-compose-mongoose resolver retrieving a single Disaster using DataLoader and the lean option.
 * @property {Function} disasterDataLoaderManyLean - graphql-compose-mongoose resolver for retrieving multiple Disasters using DataLoader and the lean option.
 * @property {Function} disasterCount - graphql-compose-mongoose resolver for retrieving the count of all Disasters.
 * @property {Function} disasterConnection - graphql-compose-mongoose resolver for retrieving a connection of Disasters.
 * @property {Function} disasterPagination - graphql-compose-mongoose resolver for retrieving a paginated list of Disasters.
 * @property {Object} getDisasterData - graphql-compose-mongoose resolver for retrieving a Disaster along with its pins.
 * @property {mongoose.Schema.Types.ObjectId} getDisasterData._id - The ID of the Disaster to retrieve.
 * @property {DisasterCustomPayload} getDisasterData.type - The type of the retrieved Disaster.
 * @property {Function} getDisasterData.resolve - Custom resolver to get Disaster data as a DisasterCustomPayload.
 */
export const disasterQuery = {
  disasterById: DisasterTC.mongooseResolvers.findById(),
  disasterByIds: DisasterTC.mongooseResolvers.findByIds(),
  disasterOne: DisasterTC.mongooseResolvers.findOne(),
  disasterMany: DisasterTC.mongooseResolvers.findMany(),
  disasterDataLoader: DisasterTC.mongooseResolvers.dataLoader(),
  disasterDataLoaderMany: DisasterTC.mongooseResolvers.dataLoaderMany(),
  disasterByIdLean: DisasterTC.mongooseResolvers.findById({ lean: true }),
  disasterByIdsLean: DisasterTC.mongooseResolvers.findByIds({ lean: true }),
  disasterOneLean: DisasterTC.mongooseResolvers.findOne({ lean: true }),
  disasterManyLean: DisasterTC.mongooseResolvers.findMany({ lean: true }),
  disasterDataLoaderLean: DisasterTC.mongooseResolvers.dataLoader({
    lean: true,
  }),
  disasterDataLoaderManyLean: DisasterTC.mongooseResolvers.dataLoaderMany({
    lean: true,
  }),
  disasterCount: DisasterTC.mongooseResolvers.count(),
  disasterConnection: DisasterTC.mongooseResolvers.connection(),
  disasterPagination: DisasterTC.mongooseResolvers.pagination(),

  getDisasterData: {
    type: DisasterCustomPayload,
    args: {
      _id: "MongoID!",
    },
    resolve: async (_, args) => {
      const allDisasters = await Disaster.findById(args._id)
        .populate("pins")
        .exec();
      return {record: allDisasters};
    },
  },
};

/**
 * GraphQL mutation for creating, updating, and removing Disaster data.
 * @typedef {Object} disasterMutation
 * @property {Object} disasterCreateOne - graphql-compose-mongoose resolver to create a single Disaster.
 * @property {Object} disasterCreateMany - graphql-compose-mongoose resolver to create Creates multiple Disasters.
 * @property {Object} disasterUpdateById - graphql-compose-mongoose resolver to update a Disaster by ID.
 * @property {Object} disasterRemoveById - graphql-compose-mongoose resolver to remove a Disaster by ID.
 * @property {Object} disasterRemoveOne - graphql-compose-mongoose resolver to remove a single Disaster.
 * @property {Object} addEmailSubscribers - Custom resolver to adds a user ID to a Disaster's subscriptions.
 * @property {mongoose.Schema.Types.ObjectId!} addEmailSubscribers._id - The ID of the Disaster to add a subscriber to.
 * @property {mongoose.Schema.Types.ObjectId!} addEmailSubscribers.user_id - The ID of the user to add as a subscriber.
 * @property {DisasterCustomPayload} addEmailSubscribers.type - The type of the retrieved Disaster.
 * @property {Function} addEmailSubscribers.resolve - Resolves the addEmailSubscribers mutation.
 */
export const disasterMutation = {
  disasterCreateOne: DisasterTC.mongooseResolvers.createOne(),
  disasterCreateMany: DisasterTC.mongooseResolvers.createMany(),
  disasterUpdateById: DisasterTC.mongooseResolvers.updateById(),
  disasterRemoveById: DisasterTC.mongooseResolvers.removeById(),
  disasterRemoveOne: DisasterTC.mongooseResolvers.removeOne(),
  addEmailSubscribers: {
    type: DisasterCustomPayload,
    args: {
      _id: "MongoID!",
      user_id: "MongoID!",
    },
    resolve: async (_, args) => {
      const disaster = await Disaster.findById(args._id);
      if (disaster) {
        const disasters = await Disaster.findByIdAndUpdate(
          { _id: args._id },
          { $addToSet: { subscriptions: args.user_id } } //prevents addition of duplicated user_ID
        );
        return { record: disasters };
      } else {
        console.log("Error");
      }
    },
  },
};

/**
 * Watches the Disaster collection for changes and publishes an event when a change occurs.
 * @type {Object}
 * @property {Function} on - Registers a callback to be called when a change occurs in the collection.
 */
const stream = Disaster.watch().on("change", (data) => {
  pubsub.publish("DISASTER_UPDATED", { caseAdded: data.fullDocument });
});
