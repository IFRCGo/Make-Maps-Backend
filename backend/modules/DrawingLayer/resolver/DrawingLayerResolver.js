import { pubsub } from "../../../server.js";
import { Disaster } from "../../Disaster/models/DisasterMongoose.js";
import { DrawingLayer } from "../models/DrawingLayerMongoose.js";
import { DrawingLayerTC } from "../schema/DrawingLayerSchema.js";
import { GraphQLObjectType } from "graphql";


/**
 * GraphQL query for retrieving and manipulating DrawingLayer data.
 * @typedef {Object} DrawingLayerQuery
 * @property {Function} drawingLayerById - graphql-compose-mongoose resolver for retrieving a drawing layer by ID.
 * @property {Function} drawingLayerByIds - graphql-compose-mongoose resolver for retrieving drawing layers by IDs.
 * @property {Function} drawingLayerOne - graphql-compose-mongoose resolver for retrieving a single drawing layer.
 * @property {Function} drawingLayerMany - graphql-compose-mongoose resolver for retrieving multiple drawing layers.
 * @property {Function} drawingLayerDataLoader - graphql-compose-mongoose resolver for loading drawing layers data.
 * @property {Function} drawingLayerDataLoaderMany - graphql-compose-mongoose resolver for loading multiple drawing layers data.
 * @property {Function} drawingLayerByIdLean - graphql-compose-mongoose resolver for retrieving a drawing layer by ID using lean query.
 * @property {Function} drawingLayerByIdsLean - graphql-compose-mongoose resolver for retrieving drawing layers by IDs using lean query.
 * @property {Function} drawingLayerOneLean - graphql-compose-mongoose resolver for retrieving single drawing layer using lean query.
 * @property {Function} drawingLayerManyLean - graphql-compose-mongoose resolver for retrieving multiple drawing layers using lean query.
 * @property {Function} drawingLayerDataLoaderLean - graphql-compose-mongoose resolver for loading drawing layers data using lean query.
 * @property {Function} drawingLayerDataLoaderManyLean - graphql-compose-mongoose resolver for loading multiple drawing layers data using lean query.
 * @property {Function} drawingLayerCount - graphql-compose-mongoose resolver for counting drawing layers.
 * @property {Function} drawingLayerConnection - graphql-compose-mongoose resolver for paginated connection of drawing layers.
 * @property {Function} drawingLayerPagination - graphql-compose-mongoose resolver for paginating drawing layers.
 */
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

/**
 * Custom payload type for DrawingLayer mutations
 * @typedef {Object} DrawingLayerCustomPayload
 * @property {Object} record.type - The DrawingLayerTC schema type
 */
const DrawingLayerCustomPayload = new GraphQLObjectType({
  name: "DrawingLayerRemoveOneCustomPayload",
  fields: {
    record: { type: DrawingLayerTC.getType() },
  },
});


/**
 * GraphQL mutations for creating, updating, and removing drawing layers.
 * @typedef {Object} DrawingLayerMutation
 * @property {Function} drawingLayerCreateOne - graphql-compose-mongoose resolver for creating a single drawing layer.
 * @property {Function} drawingLayerCreateMany - graphql-compose-mongoose resolver for creating multiple drawing layers.
 * @property {Function} drawingLayerUpdateById - graphql-compose-mongoose resolver for updating a drawing layer by ID.
 * @property {Function} drawingLayerRemoveById - graphql-compose-mongoose resolver for removing drawing layer by ID.
 * @property {Function} drawingLayerRemoveOne - graphql-compose-mongoose resolver for removing single drawing layer.
 * @property {Function} drawingLayerCreateOneCustom - Custom resolver for creating single drawing layer and publishing an event for subscribers.
 * @property {Function} drawingLayerUpdateByIdCustom - Custom resolver for updating drawing layer by ID and publishing an event for subscribers.
 * @property {Function} drawingLayerRemoveOneCustom - Custom resolver for removing single drawing layer and publishing an event for subscribers.
 */
export const drawingLayerMutation = {
  drawingLayerCreateOne: DrawingLayerTC.mongooseResolvers.createOne(),
  drawingLayerCreateMany: DrawingLayerTC.mongooseResolvers.createMany(),
  drawingLayerUpdateById: DrawingLayerTC.mongooseResolvers.updateById(),
  drawingLayerRemoveById: DrawingLayerTC.mongooseResolvers.removeById(),
  drawingLayerRemoveOne: DrawingLayerTC.mongooseResolvers.removeOne(),

  drawingLayerCreateOneCustom: {
    type: DrawingLayerCustomPayload,
    args: {
      record: "CreateOneDrawingLayerInput!",
    },
    resolve: async (_, { record }) => {
      const { disaster, createdBy, featureType, featureGeoJSON } = record;
      const newLayer = new DrawingLayer({
        disaster,
        createdBy,
        featureType,
        featureGeoJSON,
      });
      const savedLayer = await newLayer.save();
      await Disaster.updateOne(
        { _id: disaster },
        { $push: { drawingLayers: savedLayer._id } }
      );
      pubsub.publish("DRAWING_LAYER_ADDED", {
        drawingLayerAdded: savedLayer,
        disasterId: disaster,
      });
      return { record: savedLayer };
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
          { ...args.record, date: new Date() },
          { new: true }
        );
        await Disaster.findByIdAndUpdate(
          { _id: layer.disaster },
          { updatedAt: new Date() }
        );
        pubsub.publish("DRAWING_LAYER_UPDATED", {
          drawingLayerUpdated: layer,
          disasterId: layer.disaster,
        });
      }
      return { record: layer };
    },
  },

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
            lastUpdated: new Date(),
          }
        );
        pubsub.publish("DRAWING_LAYER_REMOVED", {
          drawingLayerRemoved: removedLayer,
          disasterId: removedLayer.disaster,
        });
      }
      return { record: removedLayer };
    },
  },
};
