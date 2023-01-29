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
  mapLayerQuery,
  mapLayerMutation,
} from "../modules/MapLayer/resolver/MapLayerResolver.js";
import { DisasterTC } from "../modules/Disaster/schema/DisasterSchema.js";
import { pubsub } from "../server.js";

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
  ...disasterSubscription,
  disasterSubscriptionInline: {
    type: DisasterTC,
    resolve: (payload) => {
      payload._id;
    },
    subscribe: () => pubsub.asyncIterator(["DISASTER_UPDATED"]),
  },
});
export const graphqlSchema = schemaComposer.buildSchema();
