import { drawingLayerTC } from "../schema/DrawingLayerSchema.js";

export const drawingLayerQuery = {
  drawingLayerById: drawingLayerTC.mongooseResolvers.findById(),
  drawingLayerByIds: drawingLayerTC.mongooseResolvers.findByIds(),
  drawingLayerOne: drawingLayerTC.mongooseResolvers.findOne(),
  drawingLayerMany: drawingLayerTC.mongooseResolvers.findMany(),
  drawingLayerDataLoader: drawingLayerTC.mongooseResolvers.dataLoader(),
  drawingLayerDataLoaderMany: drawingLayerTC.mongooseResolvers.dataLoaderMany(),
  drawingLayerByIdLean: drawingLayerTC.mongooseResolvers.findById({ lean: true }),
  drawingLayerByIdsLean: drawingLayerTC.mongooseResolvers.findByIds({ lean: true }),
  drawingLayerOneLean: drawingLayerTC.mongooseResolvers.findOne({ lean: true }),
  drawingLayerManyLean: drawingLayerTC.mongooseResolvers.findMany({ lean: true }),
  drawingLayerDataLoaderLean: drawingLayerTC.mongooseResolvers.dataLoader({
    lean: true,
  }),
  drawingLayerDataLoaderManyLean: drawingLayerTC.mongooseResolvers.dataLoaderMany({
    lean: true,
  }),
  drawingLayerCount: drawingLayerTC.mongooseResolvers.count(),
  drawingLayerConnection: drawingLayerTC.mongooseResolvers.connection(),
  drawingLayerPagination: drawingLayerTC.mongooseResolvers.pagination(),
};

export const drawingLayerMutation = {
  drawingLayerCreateOne: drawingLayerTC.mongooseResolvers.createOne(),
  drawingLayerCreateMany: drawingLayerTC.mongooseResolvers.createMany(),
  drawingLayerUpdateById: drawingLayerTC.mongooseResolvers.updateById(),
  drawingLayerRemoveById: drawingLayerTC.mongooseResolvers.removeById(),
  drawingLayerRemoveOne: drawingLayerTC.mongooseResolvers.removeOne(),
};
