import {ApolloServer} from "apollo-server-express";
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import mongoose from "mongoose";
import {Disaster} from "../../modules/Disaster/models/DisasterMongoose.js";
import {graphqlSchema} from "../../resolver/resolverIndex.js";

describe('Query Testing', ()=>{
    let testDisasterId =''
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const disaster = new Disaster({
            disasterName: "Testing Disaster",
            disasterType: "Test Type",
            date: new Date(),
            region: "Test Region",
            location: "Test Location",
            disasterCoordinates: {
                type: "Point",
                coordinates: [0, 0],
            },
            disasterInformation: "Test Disaster Information",
            amount_requested: "10",
            amount_funded: "5",
            createdBy: mongoose.Types.ObjectId(),
            pins: [],
            drawingLayers: [],
            subscriptions: [],
        });
        const savedDisaster = await disaster.save();
        testDisasterId = savedDisaster._id;
    });

    afterAll(async () => {
        await Disaster.deleteOne({ _id: testDisasterId});
        await mongoose.disconnect();
    });

    it('returns disaster with the provided ID', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'query TestDisasterQuery($id: MongoID!) { disasterById(_id: $id){ _id} }',
            variables: { id: testDisasterId},
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.disasterById._id).toBe(testDisasterId.toString());
    });
})
