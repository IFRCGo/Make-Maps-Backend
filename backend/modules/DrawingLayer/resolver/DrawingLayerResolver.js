import { Disaster } from "../../Disaster/models/DisasterMongoose.js";
import { DrawingLayer } from "../models/DrawingLayerMongoose.js";
import { DrawingLayerTC } from "../schema/DrawingLayerSchema.js";
import { GraphQLObjectType } from "graphql";

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

const DrawingLayerCustomPayload = new GraphQLObjectType({
  name: "DrawingLayerRemoveOneCustomPayload",
  fields: {
    record: { type: DrawingLayerTC.getType() },
  },
});

export const drawingLayerMutation = {
  drawingLayerCreateOne: DrawingLayerTC.mongooseResolvers.createOne(),
  drawingLayerCreateMany: DrawingLayerTC.mongooseResolvers.createMany(),
  drawingLayerUpdateById: DrawingLayerTC.mongooseResolvers.updateById(),
  drawingLayerRemoveById: DrawingLayerTC.mongooseResolvers.removeById(),
  drawingLayerRemoveOne: DrawingLayerTC.mongooseResolvers.removeOne(),

  drawingLayerRemoveOneCustom: {
    type: DrawingLayerCustomPayload,
    args: {
      _id: "MongoID!",
    },
    resolve: async (_, args) => {
      const removedLayer = await DrawingLayer.findByIdAndRemove(args._id);
      if (removedLayer) {
        await Disaster.findByIdAndUpdate(
          { _id: removedLayer.disaster },
          {
            $pull: { drawingLayers: removedLayer._id },
          }
        );
      }
      return { record: removedLayer };
    },
  },
  drawingLayerUpdateByIdCustom: {
    type: DrawingLayerCustomPayload,
    args: {
      _id: "MongoID!",
      record: "UpdateByIdDrawingLayerInput!",
    },
    resolve: async (_, args) => {
      var layer = await DrawingLayer.findById(args._id);
      if (layer) {
        layer = await DrawingLayer.findByIdAndUpdate(
          { _id: args._id },
          { ...args.record },
          { new: true }
        );
        await Disaster.findByIdAndUpdate({ _id: layer.disaster });
      }
      return { record: layer };
    },
  },
};
