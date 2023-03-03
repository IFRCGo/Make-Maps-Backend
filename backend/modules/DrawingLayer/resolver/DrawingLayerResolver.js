import { DrawingLayerTC } from "../schema/DrawingLayerSchema.js";

export const drawingLayerQuery = {
  drawingLayerById: DrawingLayerTC.mongooseResolvers.findById(),
  drawingLayerByIds: DrawingLayerTC.mongooseResolvers.findByIds(),
  drawingLayerOne: DrawingLayerTC.mongooseResolvers.findOne(),
  drawingLayerMany: DrawingLayerTC.mongooseResolvers.findMany(),
  drawingLayerDataLoader: DrawingLayerTC.mongooseResolvers.dataLoader(),
  drawingLayerDataLoaderMany: DrawingLayerTC.mongooseResolvers.dataLoaderMany(),
  drawingLayerByIdLean: DrawingLayerTC.mongooseResolvers.findById({
    lean: true,
  }),
  drawingLayerByIdsLean: DrawingLayerTC.mongooseResolvers.findByIds({
    lean: true,
  }),
  drawingLayerOneLean: DrawingLayerTC.mongooseResolvers.findOne({ lean: true }),
  drawingLayerManyLean: DrawingLayerTC.mongooseResolvers.findMany({
    lean: true,
  }),
  drawingLayerDataLoaderLean: DrawingLayerTC.mongooseResolvers.dataLoader({
    lean: true,
  }),
  drawingLayerDataLoaderManyLean:
    DrawingLayerTC.mongooseResolvers.dataLoaderMany({
      lean: true,
    }),
  drawingLayerCount: DrawingLayerTC.mongooseResolvers.count(),
  drawingLayerConnection: DrawingLayerTC.mongooseResolvers.connection(),
  drawingLayerPagination: DrawingLayerTC.mongooseResolvers.pagination(),
};

export const drawingLayerMutation = {
  drawingLayerCreateOne: DrawingLayerTC.mongooseResolvers.createOne(),
  drawingLayerCreateMany: DrawingLayerTC.mongooseResolvers.createMany(),
  drawingLayerUpdateById: DrawingLayerTC.mongooseResolvers.updateById(),
  drawingLayerRemoveById: DrawingLayerTC.mongooseResolvers.removeById(),
  drawingLayerRemoveOne: DrawingLayerTC.mongooseResolvers.removeOne(),
};
