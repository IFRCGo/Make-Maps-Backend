import { schemaComposer } from "graphql-compose";

import {
  userMutation,
  userQuery,
} from "../modules/User/resolver/UserResolver.js";
import {
  disasterQuery,
  disasterMutation,
} from "../modules/Disaster/resolver/DisasterResolver.js";

import { pinQuery, pinMutation } from "../modules/Pin/resolver/PinResolver.js";

import {
  drawingLayerQuery,
  drawingLayerMutation,
} from "../modules/DrawingLayer/resolver/DrawingLayerResolver.js";
import {
  disasterSubscription,
  drawLayerAddedSubscription,
  drawLayerRemovedSubscription,
  drawLayerUpdatedSubscription,
  pinAddedSubscription,
  pinRemovedSubscription,
  pinUpdatedSubscription,
} from "./../modules/Disaster/Subscriptions/Subscriptions.js";

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
  ...pinAddedSubscription,
  ...pinRemovedSubscription,
  ...pinUpdatedSubscription,
  ...drawLayerAddedSubscription,
  ...drawLayerRemovedSubscription,
  ...drawLayerUpdatedSubscription,
});
export const graphqlSchema = schemaComposer.buildSchema();
