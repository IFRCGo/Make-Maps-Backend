import { DisasterTC } from "../schema/DisasterSchema.js";
import { Disaster } from "./../models/DisasterMongoose.js";
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

  //custom resolvers
  customResolver: DisasterTC.addResolver({
    name: "findByName2",
    type: DisasterTC,
    args: {
      name: "String!",
    },
    resolve: async ({ args, context }) => {
      const user = await Disaster.findOne({ name: args.name });
      return user;
    },
  }),
};

export const disasterMutation = {
  disasterCreateOne: DisasterTC.mongooseResolvers.createOne(),
  disasterCreateMany: DisasterTC.mongooseResolvers.createMany(),
  disasterUpdateById: DisasterTC.mongooseResolvers.updateById(),
  disasterRemoveById: DisasterTC.mongooseResolvers.removeById(),
  disasterRemoveOne: DisasterTC.mongooseResolvers.removeOne(),
};
