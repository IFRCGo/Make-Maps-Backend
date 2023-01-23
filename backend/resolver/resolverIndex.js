import { schemaComposer } from 'graphql-compose';

import {userMutation, userQuery} from "../modules/User/resolver/UserResolver.js";
import {disasterQuery, disasterMutation } from "../modules/Diaster/resolver/DisasterResolver.js";

schemaComposer.Query.addFields({
    ...disasterQuery,
    ...userQuery
})

schemaComposer.Mutation.addFields({
    ...disasterMutation,
    ...userMutation
})


export const graphqlSchema = schemaComposer.buildSchema();