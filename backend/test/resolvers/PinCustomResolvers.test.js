import {ApolloServer} from "apollo-server-express";
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import mongoose from "mongoose";
import {Disaster} from "../../modules/Disaster/models/DisasterMongoose.js";
import {graphqlSchema} from "../../resolver/resolverIndex.js";
import {Pin} from "../../modules/Pin/models/PinMongoose.js";

describe('Pin Custom Resolvers Testing', ()=>{
    let testPinId=''
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const pin = new Pin({
            disaster: mongoose.Types.ObjectId(),
            pinText: "Test Pin",
            pinCoordinates: {
                type: "Point",
                coordinates: [0, 0],
            },
            createdBy: mongoose.Types.ObjectId(),
        });
        const savedPin = await pin.save();
        testPinId = savedPin._id

    });

    afterAll(async () => {
        await Pin.deleteOne({ _id: testPinId});
        await mongoose.disconnect();
    });

    it('Creates a custom Pin using pinCreateOneCustom', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation PinCreateOneCustom($record: CreateOnePinInput!) { pinCreateOneCustom(record: $record) { record { disaster createdBy _id pinCoordinates { coordinates type } createdAt pinText} } }',
            variables: {
                record:{
                    disaster: mongoose.Types.ObjectId(),
                    createdAt: new Date(),
                    createdBy: mongoose.Types.ObjectId(),
                    pinCoordinates: {
                        coordinates: [5,5],
                        type: "Point"
                    },
                    updatedAt: new Date(),
                    pinText: "Created For Testing"
                }},
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.pinCreateOneCustom.record._id).toBeDefined();
        expect(response.data.pinCreateOneCustom.record.pinText).toBe("Created For Testing");

        const testQuery = await testServer.executeOperation({
            query: 'query Query($id: MongoID!) { pinById(_id: $id) { _id pinText } }',
            variables: { id: response.data.pinCreateOneCustom.record._id},
        });
        expect(testQuery.errors).toBeUndefined();
        expect(testQuery.data.pinById.pinText).toBe("Created For Testing")
        expect(testQuery.data.pinById._id).toBe(response.data.pinCreateOneCustom.record._id)
    });
    it('Updates a Pin by ID with the resolver PinUpdateByIdCustom', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation PinUpdateByIdCustom($id: MongoID!, $record: UpdateByIdPinInput!) { PinUpdateByIdCustom(_id: $id, record: $record) { record { _id pinText } } }',
            variables: { id: testPinId, record:{ pinText: "Updated Pin Text"}},
        });

        expect(response.errors).toBeUndefined();
        expect(response.data.PinUpdateByIdCustom.record.pinText).toBe("Updated Pin Text");

        const testQuery = await testServer.executeOperation({
            query: 'query Query($id: MongoID!) { pinById(_id: $id) { _id pinText } }',
            variables: { id: testPinId},
        });
        expect(testQuery.errors).toBeUndefined();
        expect(testQuery.data.pinById.pinText).toBe("Updated Pin Text")
        expect(testQuery.data.pinById._id).toBe(testPinId.toString())
    });
    it('Removes a custom Pin by ID', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation PinRemoveOneCustom($id: MongoID!) { pinRemoveOneCustom(_id: $id) { record { _id } } }',
            variables: { id: testPinId},
        });

        expect(response.errors).toBeUndefined();
        expect(response.data.pinRemoveOneCustom.record._id).toBe(testPinId.toString());

        const testQuery = await testServer.executeOperation({
            query: 'query Query($id: MongoID!) { pinById(_id: $id) { _id } }',
            variables: { id: testPinId},
        });
        expect(testQuery.data.pinById).toBeNull();
    });
})
