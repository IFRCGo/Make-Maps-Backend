import express from "express";

import cron from 'node-cron'
import dotenv from "dotenv";
dotenv.config();

import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { graphqlSchema } from "./resolver/resolverIndex.js";

import {ApolloServer, AuthenticationError} from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import { connectDB } from "./utils/database.js";
import { StartMapSubscription } from "./modules/EmailUpdates/EmailUpdates.js";
//cors
import cors from 'cors'
import session from "express-session";


//Database connection
connectDB();

//Express
const app = express();

//Middleware
app.use(express.json());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set this to true on production
  }
}))
app.use(
  cors({
    origin: "*", //change this to specific website
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("IFRC GO Make Maps Backend Running!");
});
const PORT = process.env.PORT || 9092;

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/graphql",
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema: graphqlSchema }, wsServer);

  const server = new ApolloServer({
    schema: graphqlSchema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    context: ({ req, res }) => ({ req, res, pubsub }), // add pubsub to the context
    csrfPrevention: true,
    cache: "bounded",
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise((resolve) => httpServer.listen(PORT, resolve));

  console.log(
    `🚀 Graph Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );

  // StartMapSubscription();
}
startApolloServer();
