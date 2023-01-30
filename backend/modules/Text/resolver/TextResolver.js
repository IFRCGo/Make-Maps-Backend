import { GraphQLObjectType } from "graphql";
import { Text } from "../models/TextMongoose.js";
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

const TextCustomPayload = new GraphQLObjectType({
  name: "TextRemoveOneCustomPayload",
  fields: {
    record: { type: TextTC.getType() },
  },
});

export const textMutation = {
  textCreateOne: TextTC.mongooseResolvers.createOne(),
  textCreateMany: TextTC.mongooseResolvers.createMany(),
  textUpdateById: TextTC.mongooseResolvers.updateById(),
  textRemoveById: TextTC.mongooseResolvers.removeById(),
  textRemoveOne: TextTC.mongooseResolvers.removeOne(),

  TextRemoveOneCustom: {
    type: TextCustomPayload,
    args: {
      _id: "MongoID!",
    },
    resolve: async (_, args) => {
      const removedText = await Text.findByIdAndRemove(args._id);
      if (removedText) {
        await Disaster.findByIdAndUpdate(
          { _id: removedText.disaster },
          { $pull: { pins: removedText._id }, lastUpdated: new Date() }
        );
      }
      return { record: removedText };
    },
  },

  TextUpdateByIdCustom: {
    type: TextCustomPayload,
    args: {
      _id: "MongoID!",
      record: "UpdateByIdTextInput!",
    },
    resolve: async (_, args) => {
      var txt = await Text.findById(args._id);
      if (txt) {
        txt = await Text.findByIdAndUpdate(
          { _id: args._id },
          { ...args.record, date: new Date() },
          { new: true }
        );
        await Disaster.findByIdAndUpdate(
          { _id: txt.disaster },
          { lastUpdated: new Date() }
        );
      }
      return { record: txt };
    },
  },
};
