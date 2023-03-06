import { DisasterTC } from "../schema/DisasterSchema.js";
import { Disaster } from "./../models/DisasterMongoose.js";

import { pubsub } from "../../../server.js";
import { GraphQLObjectType } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { Pin } from "../../Pin/models/PinMongoose.js";
import { PinTC } from "../../Pin/schema/PinSchema.js";
import { DrawingLayer } from "../../DrawingLayer/models/DrawingLayerMongoose.js";

const DisasterCustomPayload = new GraphQLObjectType({
  name: "DisasterCustomPayload",
  fields: {
    record: { type: DisasterTC.getType() },
  },
});

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
      console.log(allDisasters);
      return allDisasters;
    },
  },
};

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

const stream = Disaster.watch().on("change", (data) => {
  pubsub.publish("DISASTER_UPDATED", { caseAdded: data.fullDocument });
});
