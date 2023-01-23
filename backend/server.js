import express from 'express';

//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//Env Variables Usage
const  dotenv = require('dotenv');
dotenv.config();

//Database connection
// import { connectDB } from "./utils/database.js";
// connectDB().then(r => console.log(r))
//cors
var cors = require('cors');

//Express
const app = express();

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.origin,
    credentials: true,
  })
);

import { graphqlSchema } from './resolver/resolverIndex.js'

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import http from 'http';

async function startApolloServer(typeDefs, resolvers) {
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema: graphqlSchema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });

    await server.start();
    server.applyMiddleware({
        app,
        path: '/',
    });

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer()