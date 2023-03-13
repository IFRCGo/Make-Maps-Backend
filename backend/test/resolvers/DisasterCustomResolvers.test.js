import {ApolloServer} from "apollo-server-express";
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import mongoose from "mongoose";
import {Disaster} from "../../modules/Disaster/models/DisasterMongoose.js";
import {graphqlSchema} from "../../resolver/resolverIndex.js";
import {Pin} from "../../modules/Pin/models/PinMongoose.js";

describe('Disaster Custom Resolvers Testing', ()=>{
    let testDisasterId =''
    let testPinId=''
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
        let savedDisaster = await disaster.save();
        testDisasterId = savedDisaster._id;

        const pin = new Pin({
            disaster: savedDisaster._id,
            pinText: "Test Pin",
            pinCoordinates: {
                type: "Point",
                coordinates: [0, 0],
            },
            createdBy: mongoose.Types.ObjectId(),
        });
        const savedPin = await pin.save();
        testPinId = savedPin._id

        disaster.pins.push(testPinId)
        await disaster.save();

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
            query: 'query GetDisasterData($id: MongoID!) { getDisasterData(_id: $id) { record { _id pins } } }',
            variables: { id: testDisasterId},
        });


        let pinData =await response.data.getDisasterData.record.pins[0]
        const regex = /([{,]\s*)(\w+)\s*:/g;
        let formattedJsonString = pinData
            .replace(regex, '$1"$2":')  // replace property names with double-quoted versions
            .replace(/new ObjectId\("(\w+)"\)/g, '"$1"') // replace ObjectId strings with regular strings
            .replace(/:\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/g, ': "$1"'); //wrap date strings in double quotes

        //Replaces all single quotes with double quotes
        formattedJsonString = formattedJsonString.replace(/'/g, '"')

        //Parse string to JSON Object
        formattedJsonString = JSON.parse(formattedJsonString)

        expect(response.errors).toBeUndefined();
        expect(response.data.getDisasterData.record._id).toBe(testDisasterId.toString());
        expect(formattedJsonString._id).toBe(testPinId.toString());
    });
})
