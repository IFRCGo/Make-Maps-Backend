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
//Passport
import passport from 'passport'
import {OIDCStrategy} from "passport-azure-ad";
import {creds} from "./auth/authConfig.js";
import session from "express-session";
import {GraphQLError} from "graphql/error/index.js";
import {User} from "./modules/User/models/UserMongoose.js";


//Database connection
connectDB();

//Express
const app = express();

//Middleware
app.use(express.json());
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

  // Passport.js
  const  options = {
    // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
    identityMetadata: creds.identityMetadata,
    collectInfoFromReq: {
      tenantIdOrName: process.env.TENANT_ID
    },
    clientID: process.env.CLIENT_ID,
    validateIssuer: creds.validateIssuer,
    issuer: creds.issuer,
    passReqToCallback: creds.passReqToCallback,
    isB2C: false,
    policyName: false,
    allowMultiAudiencesInToken: creds.allowMultiAudiencesInToken,
    audience: creds.audience,
    loggingLevel: creds.loggingLevel,
    responseType: 'id_token',
    responseMode: 'form_post',
    allowHttpForRedirectUrl: true, //for development only
    redirectUrl: 'http://localhost:9092/graphql',
  };
  // current owner
  let owner = null;

  app.use(passport.initialize(options)); // Starts passport
  app.use(passport.session(options)); // Provides session support

  const bearerStrategy = new OIDCStrategy(options,
      async function (token, done) {
    try{
        if (!token.oid)
          done(new Error('oid is not found in token'));

        const knownAccount = await User.findOne({accountIdentifier: token.oid})
        if (knownAccount) return done(null, knownAccount, token)

        const user = new User()
        user.accountIdentifier = token.oid
        user.name = "Auth Testing"//token.name
        user.userName = token.preferred_username
        const newUser = await user.save()
        return done(null, newUser, token)
      } catch (error) {
          console.error(`Failed adding the user to the request object: ${error}`)
        }
      })
  passport.use("oauth-bearer", bearerStrategy)


  const getUser = (req, res) =>
      new Promise((resolve, reject) => {
        passport.authenticate(
            'oauth-bearer',
            { session: false },
            (err, user) => {
          if (err) reject(err)
          resolve(user)
        })(req, res)
      })

  function testAPI(req, res, next){
    console.log(req, res)
    return next();
  }

  app.post('/auth/signin',  passport.authenticate(
      'oauth-bearer',
      { session: false},
      (err, user) =>{
        if(err) console.log(err)

        console.log("error:" + err)
        console.log("USER:" + user)
        // console.log(res)
        // res.redirect('/');
      },
      testAPI))

  const server = new ApolloServer({
    schema: graphqlSchema,
    // context: async ({ req  }) => {
    //   // const user = await getUser(req, res)
    //   // if (!user) throw new AuthenticationError('No user logged in')
    //   // console.log('User found', user)
    //   //
    //   // return { user }
    //   // Get the user token from the headers.
    //   const token = req.headers.authorization || '';
    //   console.log(token);
    //   // Try to retrieve a user with the token
    //   const user = await getUser(token);
    //   // if (!user)
    //   //     // throwing a `GraphQLError` here allows us to specify an HTTP status code,
    //   //     // standard `Error`s will have a 500 status code by default
    //   //   throw new GraphQLError('User is not authenticated', {
    //   //     extensions: {
    //   //       code: 'UNAUTHENTICATED',
    //   //       http: { status: 401 },
    //   //     },
    //   //   });
    //
    //   // Add the user to the context
    //   return { user };
    // },
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
