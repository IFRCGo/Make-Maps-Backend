import { DisasterTC } from "../schema/DisasterSchema.js";
import { Disaster } from "./../models/DisasterMongoose.js";
import { Pin } from "./../../Pin/models/PinMongoose.js";
import {pubsub} from "../../../server.js";

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
};

export const disasterMutation = {
  disasterCreateOne: DisasterTC.mongooseResolvers.createOne(),
  disasterCreateMany: DisasterTC.mongooseResolvers.createMany(),
  disasterUpdateById: DisasterTC.mongooseResolvers.updateById(),
  disasterRemoveById: DisasterTC.mongooseResolvers.removeById(),
  disasterRemoveOne: DisasterTC.mongooseResolvers.removeOne(),
};

export const disasterSubscription = {
  disasterSubscription: {
    type: DisasterTC,
    resolve: (payload) => { Disaster.findById(payload._id)},
    subscribe: () => pubsub.asyncIterator(["DISASTER_UPDATED"]),
  }
}
