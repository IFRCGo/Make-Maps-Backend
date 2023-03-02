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

import {
  textQuery,
  textMutation,
} from "../modules/Text/resolver/TextResolver.js";

import { pinQuery, pinMutation } from "../modules/Pin/resolver/PinResolver.js";

import {
  drawingLayerQuery,
  drawingLayerMutation,
} from "../modules/DrawingLayer/resolver/DrawingLayerResolver.js";

schemaComposer.Query.addFields({
  ...disasterQuery,
  ...userQuery,
  ...textQuery,
  ...pinQuery,
  ...drawingLayerQuery,
});

schemaComposer.Mutation.addFields({
  ...disasterMutation,
  ...userMutation,
  ...textMutation,
  ...pinMutation,
  ...drawingLayerMutation,
});

schemaComposer.Subscription.addFields({
  ...disasterSubscription,
});
export const graphqlSchema = schemaComposer.buildSchema();
