import { DisasterTC } from "../schema/DisasterSchema.js";
import { Disaster } from "./../models/DisasterMongoose.js";
import { Pin } from "./../../Pin/models/PinMongoose.js";

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

  //custom resolvers ->not working!
  addPin: DisasterTC.addResolver({
    name: "addPin",
    type: DisasterTC,
    args: {
      disasterId: "ID!",
      pinText: "String!",
      date: "Date!",
      pinCoordinates: "JSON!",
      createdBy: "ID!",
    },
    resolve: async ({ args }) => {
      // Create a new instance of the Pin model
      const { disasterId, pinText, date, pinCoordinates, createdBy } = args;
      userId = createdBy;
      const newPin = new Pin({
        disaster: disasterId,
        pinText,
        date,
        pinCoordinates,
        createdBy: userId,
      });
      // Save the new pin to the database
      await newPin.save();
      // push the new pin's id to the disaster's pins array
      await Disaster.findByIdAndUpdate(disasterId, {
        $push: { pins: newPin._id },
        $set: { lastUpdated: new Date.now() },
      });
      // Return the saved pin

      Disaster.findOne({ _id: disasterId })
        .populate("pins")
        .exec((err, disaster) => {
          if (err) {
            console.log(err);
          } else {
            console.log(disaster.pins);
          }
        });

      return newPin;
    },
  }),
};
