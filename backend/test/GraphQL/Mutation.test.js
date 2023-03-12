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

    it('Updates a pre-existing Disaster by ID', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation DisasterUpdateById($id: MongoID!, $record: UpdateByIdDisasterInput!) { disasterUpdateById(_id: $id, record: $record) { record { _id, disasterInformation } } }',
            variables: { id: testDisasterId, record:{disasterInformation:"Updated Disaster Information"}},
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.disasterUpdateById.record._id).toBe(testDisasterId.toString());
        expect(response.data.disasterUpdateById.record.disasterInformation).toBe("Updated Disaster Information");
    });

    it('Creates a new Disaster with disasterCreateOne', async() =>{
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        let responseID = ''
        const createdDisasterArgs ={
            "date": new Date(),
            "createdBy": mongoose.Types.ObjectId(),
            "amount_requested": "5000",
            "amount_funded": "2000",
            "disasterName": "Created Mutant Disaster",
            "disasterType": "Testing Creation",
            "region": "Created Region",
            "disasterCoordinates": {
                "type": "Point",
                "coordinates": [0,0]
            }
        }
        const response = await testServer.executeOperation({
            query: 'mutation DisasterCreateOne($record: CreateOneDisasterInput!) { disasterCreateOne(record: $record) { record { _id disasterName } } }',
            variables: { record: createdDisasterArgs},
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.disasterCreateOne.record.disasterName).toBe("Created Mutant Disaster")
        responseID = response.data.disasterCreateOne.record._id
        await Disaster.deleteOne({ _id: responseID})
    })

    it("Deletes a new Disaster by ID with disasterRemoveById", async () =>{
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation DisasterRemoveById($id: MongoID!) { disasterRemoveById(_id: $id) { record { disasterName _id} } }',
            variables: { id: testDisasterId},
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.disasterRemoveById.record.disasterName).toBe("Testing Disaster");
        expect(response.data.disasterRemoveById.record._id).toBe(testDisasterId.toString());
    })
})
