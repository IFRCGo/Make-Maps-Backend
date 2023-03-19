import {afterAll, beforeAll, describe, expect, it} from '@jest/globals';

// we import a function that we wrote to create a new instance of Apollo Server
import { startApolloServer  } from '../../server.js';
import { request as graphqlRequest} from 'graphql-request';

import {connectDB} from "../../utils/database.js";
import {Disaster} from "../../modules/Disaster/models/DisasterMongoose.js";
import mongoose from "mongoose";

import request from "supertest";

describe('GraphQL End-to-End Test', () => {
    const baseEndpoint ='http://localhost:9092'
    const graphQLEndpoint = 'http://localhost:9092/graphql';
    let testServer;
    let testDisasterId;
    // before the tests we spin up a new Apollo Server
    beforeAll( async () => {
        await connectDB();
        testServer = await startApolloServer();
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
        let savedDisaster = await disaster.save();
        testDisasterId = savedDisaster._id;
    });

    afterAll(async () => {
        await Disaster.deleteOne({ _id: testDisasterId});
        await mongoose.disconnect();
        await testServer.stop();
    });

    it('Get /', async () =>{
        const response = await request(baseEndpoint).get('/')
        expect(response.status).toBe(200);
        expect(response.text).toBe('IFRC GO Make Maps Backend Running!');
    })

    it('End2End Check', async () => {
        const queryData = "query GetDisasterData($id: MongoID!) { getDisasterData(_id: $id) { record { _id location } } }";
        await graphqlRequest(graphQLEndpoint, queryData, { id: testDisasterId}).then((response) => {
            expect(response.errors).toBeUndefined();
            expect(response.getDisasterData.record._id).toBe(testDisasterId.toString());
            expect(response.getDisasterData.record.location).toBe( "Test Location");
        });
    });
});