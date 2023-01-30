import { schemaComposer } from 'graphql-compose';

<<<<<<< Updated upstream
import {userMutation, userQuery} from "../modules/User/resolver/UserResolver.js";
import {disasterQuery, disasterMutation } from "../modules/Diaster/resolver/DisasterResolver.js";
=======
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
>>>>>>> Stashed changes

schemaComposer.Query.addFields({
    ...disasterQuery,
    ...userQuery
})

schemaComposer.Mutation.addFields({
    ...disasterMutation,
    ...userMutation
})


<<<<<<< Updated upstream
export const graphqlSchema = schemaComposer.buildSchema();
=======
schemaComposer.Subscription.addFields({
  ...disasterSubscription
});
export const graphqlSchema = schemaComposer.buildSchema();
>>>>>>> Stashed changes
