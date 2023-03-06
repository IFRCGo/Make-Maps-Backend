import { schemaComposer } from "graphql-compose";

import {
  userMutation,
  userQuery,
} from "../modules/User/resolver/UserResolver.js";
import {
  disasterQuery,
  disasterMutation,
  disasterSubscription,
} from "../modules/Disaster/resolver/DisasterResolver.js";

import { pinQuery, pinMutation } from "../modules/Pin/resolver/PinResolver.js";

import {
  drawingLayerQuery,
  drawingLayerMutation,
} from "../modules/DrawingLayer/resolver/DrawingLayerResolver.js";

schemaComposer.Query.addFields({
  ...disasterQuery,
  ...userQuery,
  ...pinQuery,
  ...drawingLayerQuery,
});

schemaComposer.Mutation.addFields({
  ...disasterMutation,
  ...userMutation,
  ...pinMutation,
  ...drawingLayerMutation,
});

schemaComposer.Subscription.addFields({
  ...disasterSubscription,
});
export const graphqlSchema = schemaComposer.buildSchema();
