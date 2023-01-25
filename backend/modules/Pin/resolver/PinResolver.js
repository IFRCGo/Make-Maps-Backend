import { PinTC } from "../schema/PinSchema.js";

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

export const pinMutation = {
  pinCreateOne: PinTC.mongooseResolvers.createOne(),
  pinCreateMany: PinTC.mongooseResolvers.createMany(),
  pinUpdateById: PinTC.mongooseResolvers.updateById(),
  pinRemoveById: PinTC.mongooseResolvers.removeById(),
  pinRemoveOne: PinTC.mongooseResolvers.removeOne(),
};
