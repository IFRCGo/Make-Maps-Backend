import { MapLayerTC } from "../schema/MapLayerSchema.js";
import { pubsub } from '../../../server.js';

export const mapLayerQuery = {
  mapLayerById: MapLayerTC.mongooseResolvers.findById(),
  mapLayerByIds: MapLayerTC.mongooseResolvers.findByIds(),
  mapLayerOne: MapLayerTC.mongooseResolvers.findOne(),
  mapLayerMany: MapLayerTC.mongooseResolvers.findMany(),
  mapLayerDataLoader: MapLayerTC.mongooseResolvers.dataLoader(),
  mapLayerDataLoaderMany: MapLayerTC.mongooseResolvers.dataLoaderMany(),
  mapLayerByIdLean: MapLayerTC.mongooseResolvers.findById({ lean: true }),
  mapLayerByIdsLean: MapLayerTC.mongooseResolvers.findByIds({ lean: true }),
  mapLayerOneLean: MapLayerTC.mongooseResolvers.findOne({ lean: true }),
  mapLayerManyLean: MapLayerTC.mongooseResolvers.findMany({ lean: true }),
  mapLayerDataLoaderLean: MapLayerTC.mongooseResolvers.dataLoader({
    lean: true,
  }),
  mapLayerDataLoaderManyLean: MapLayerTC.mongooseResolvers.dataLoaderMany({
    lean: true,
  }),
  mapLayerCount: MapLayerTC.mongooseResolvers.count(),
  mapLayerConnection: MapLayerTC.mongooseResolvers.connection(),
  mapLayerPagination: MapLayerTC.mongooseResolvers.pagination(),
};

export const mapLayerMutation = {
  mapLayerCreateOne: MapLayerTC.mongooseResolvers.createOne(),
  mapLayerCreateMany: MapLayerTC.mongooseResolvers.createMany(),
  mapLayerUpdateById: MapLayerTC.mongooseResolvers.updateById(),
  mapLayerRemoveById: MapLayerTC.mongooseResolvers.removeById(),
  mapLayerRemoveOne: MapLayerTC.mongooseResolvers.removeOne(),
};
