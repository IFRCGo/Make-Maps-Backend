import { TextTC } from "../schema/TextSchema.js";

export const textQuery = {
  textById: TextTC.mongooseResolvers.findById(),
  textByIds: TextTC.mongooseResolvers.findByIds(),
  textOne: TextTC.mongooseResolvers.findOne(),
  textMany: TextTC.mongooseResolvers.findMany(),
  textDataLoader: TextTC.mongooseResolvers.dataLoader(),
  textDataLoaderMany: TextTC.mongooseResolvers.dataLoaderMany(),
  textByIdLean: TextTC.mongooseResolvers.findById({ lean: true }),
  textByIdsLean: TextTC.mongooseResolvers.findByIds({ lean: true }),
  textOneLean: TextTC.mongooseResolvers.findOne({ lean: true }),
  textManyLean: TextTC.mongooseResolvers.findMany({ lean: true }),
  textDataLoaderLean: TextTC.mongooseResolvers.dataLoader({
    lean: true,
  }),
  textDataLoaderManyLean: TextTC.mongooseResolvers.dataLoaderMany({
    lean: true,
  }),
  textCount: TextTC.mongooseResolvers.count(),
  textConnection: TextTC.mongooseResolvers.connection(),
  textPagination: TextTC.mongooseResolvers.pagination(),
};

export const textMutation = {
  textCreateOne: TextTC.mongooseResolvers.createOne(),
  textCreateMany: TextTC.mongooseResolvers.createMany(),
  textUpdateById: TextTC.mongooseResolvers.updateById(),
  textRemoveById: TextTC.mongooseResolvers.removeById(),
  textRemoveOne: TextTC.mongooseResolvers.removeOne(),
};
