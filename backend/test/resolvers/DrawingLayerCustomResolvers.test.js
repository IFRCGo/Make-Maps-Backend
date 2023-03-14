import {ApolloServer} from "apollo-server-express";
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import mongoose from "mongoose";
import {graphqlSchema} from "../../resolver/resolverIndex.js";
import {Pin} from "../../modules/Pin/models/PinMongoose.js";
import {DrawingLayer} from "../../modules/DrawingLayer/models/DrawingLayerMongoose.js";

describe('Drawing Custom Resolvers Testing', ()=>{
    let testDrawingLayerId=''
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const drawingLayer = new DrawingLayer({
            disaster: mongoose.Types.ObjectId(),
            createdBy: mongoose.Types.ObjectId(),
            featureType: "Polygon",
            featureGeoJSON: {type: "Feature"},
        });
        const savedDrawingLayer = await drawingLayer.save();
        testDrawingLayerId = savedDrawingLayer._id
    });

    afterAll(async () => {
        await DrawingLayer.deleteOne({ _id: testDrawingLayerId});
        await mongoose.disconnect();
    });

    it('Creates a custom DrawingLayer using drawingLayerCreateOneCustom', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation DrawingLayerCreateOneCustom($record: CreateOneDrawingLayerInput!) { drawingLayerCreateOneCustom(record: $record) { record { _id featureGeoJSON disaster featureType createdBy } } }',
            variables: {
                record:{
                    disaster: mongoose.Types.ObjectId(),
                    createdBy: mongoose.Types.ObjectId(),
                    featureType: "Polygon",
                    featureGeoJSON: {type: "Feature"},
                }},
        });
        expect(response.errors).toBeUndefined();
        expect(response.data.drawingLayerCreateOneCustom.record._id).toBeDefined();
        expect(response.data.drawingLayerCreateOneCustom.record.featureType).toBe("Polygon");

        const testQuery = await testServer.executeOperation({
            query: 'query Query($id: MongoID!) { drawingLayerById(_id: $id) { _id featureType } }',
            variables: { id: response.data.drawingLayerCreateOneCustom.record._id},
        });
        expect(testQuery.errors).toBeUndefined();
        expect(testQuery.data.drawingLayerById.featureType).toBe("Polygon")
        expect(testQuery.data.drawingLayerById._id).toBe(response.data.drawingLayerCreateOneCustom.record._id)
    });
    it('Updates a Drawing Layer by ID with the resolver drawingLayerUpdateByIdCustom', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation DrawingLayerUpdateByIdCustom($id: MongoID!, $record: UpdateByIdDrawingLayerInput!) { drawingLayerUpdateByIdCustom(_id: $id, record: $record) { record { _id featureType } } }',
            variables: { id: testDrawingLayerId, record:{ featureType: "MultiLineString"}},
        });

        expect(response.errors).toBeUndefined();
        expect(response.data.drawingLayerUpdateByIdCustom.record.featureType).toBe("MultiLineString");

        const testQuery = await testServer.executeOperation({
            query: 'query Query($id: MongoID!) { drawingLayerById(_id: $id) { _id featureType } }',
            variables: { id: response.data.drawingLayerUpdateByIdCustom.record._id},
        });
        expect(testQuery.errors).toBeUndefined();
        expect(testQuery.data.drawingLayerById.featureType).toBe("MultiLineString")
        expect(testQuery.data.drawingLayerById._id).toBe(testDrawingLayerId.toString())
    });
    it('Removes a custom DrawingLayer by ID with the resolver drawingLayerRemoveOneCustom', async () => {
        const testServer = new ApolloServer({
            schema: graphqlSchema,
        });
        const response = await testServer.executeOperation({
            query: 'mutation DrawingLayerRemoveOneCustom($id: MongoID!) { drawingLayerRemoveOneCustom(_id: $id) { record { _id } } }',
            variables: { id: testDrawingLayerId},
        });

        expect(response.errors).toBeUndefined();
        expect(response.data.drawingLayerRemoveOneCustom.record._id).toBe(testDrawingLayerId.toString());

        const testQuery = await testServer.executeOperation({
            query: 'query Query($id: MongoID!) { drawingLayerById(_id: $id) { _id featureType } }',
            variables: { id: testDrawingLayerId},
        });
        expect(testQuery.data.drawingLayerById).toBeNull();
    });
})
