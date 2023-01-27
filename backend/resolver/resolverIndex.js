import { schemaComposer } from "graphql-compose";

import {
  userMutation,
  userQuery,
} from "../modules/User/resolver/UserResolver.js";
import {
  disasterQuery,
  disasterMutation,
} from "../modules/Disaster/resolver/DisasterResolver.js";

import {
  textQuery,
  textMutation,
} from "../modules/Text/resolver/TextResolver.js";

import { pinQuery, pinMutation } from "../modules/Pin/resolver/PinResolver.js";

import { mapLayerQuery, mapLayerMutation, mapLayerSubscription } from "../modules/MapLayer/resolver/MapLayerResolver.js";

schemaComposer.Query.addFields({
  ...disasterQuery,
  ...userQuery,
  ...textQuery,
  ...pinQuery,
  ...mapLayerQuery,
});

schemaComposer.Mutation.addFields({
  ...disasterMutation,
  ...userMutation,
  ...textMutation,
  ...pinMutation,
  ...mapLayerMutation,
});

schemaComposer.Subscription.addFields({
  ...mapLayerSubscription,
})
export const graphqlSchema = schemaComposer.buildSchema();
