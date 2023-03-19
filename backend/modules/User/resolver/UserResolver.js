import { UserTC } from '../schema/UserSchema.js'

/**
 * GraphQL query for retrieving and manipulating User data
 * @type {Object}
 * @property {Function} userById -  graphql-compose-mongoose resolver for retrieving a User by its ID
 * @property {Function} userByIds -  graphql-compose-mongoose resolver for retrieving multiple User their IDs
 * @property {Function} userOne -  graphql-compose-mongoose resolver for retrieving a single Users.
 * @property {Function} userMany -  graphql-compose-mongoose resolver for retrieving multiple Users
 * @property {Function} userDataLoader -  graphql-compose-mongoose resolver for retrieving a User using DataLoader
 * @property {Function} userDataLoaderMany -  graphql-compose-mongoose resolver for retrieving multiple Users using DataLoader
 * @property {Function} userByIdLean -  graphql-compose-mongoose resolver for retrieving a User by its ID using the lean option
 * @property {Function} userByIdsLean -  graphql-compose-mongoose resolver for retrieving multiple User by their IDs using the lean option for better performance
 * @property {Function} userOneLean -  graphql-compose-mongoose resolver for retrieving a single User using the lean option
 * @property {Function} userManyLean -  graphql-compose-mongoose resolver for retrieving multiple Users using the lean option
 * @property {Function} userDataLoaderLean -  graphql-compose-mongoose resolver for retrieving a User using DataLoader and the lean option for better performance
 * @property {Function} userDataLoaderManyLean -  graphql-compose-mongoose resolver for retrieving multiple Users using DataLoader and the lean option for better performance
 * @property {Function} userCount -  graphql-compose-mongoose resolver for retrieving the total number of Users that match the provided filter
 * @property {Function} userConnection -  graphql-compose-mongoose resolver a connection of Users for pagination purposes
 * @property {Function} userPagination -  graphql-compose-mongoose resolver for retrieving User documents paginated
 */
export const userQuery = {
    userById: UserTC.mongooseResolvers.findById(),
    userByIds: UserTC.mongooseResolvers.findByIds(),
    userOne: UserTC.mongooseResolvers.findOne(),
    userMany: UserTC.mongooseResolvers.findMany(),
    userDataLoader: UserTC.mongooseResolvers.dataLoader(),
    userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
    userByIdLean: UserTC.mongooseResolvers.findById({ lean: true }),
    userByIdsLean: UserTC.mongooseResolvers.findByIds({ lean: true }),
    userOneLean: UserTC.mongooseResolvers.findOne({ lean: true }),
    userManyLean: UserTC.mongooseResolvers.findMany({ lean: true }),
    userDataLoaderLean: UserTC.mongooseResolvers.dataLoader({ lean: true }),
    userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    userCount: UserTC.mongooseResolvers.count(),
    userConnection: UserTC.mongooseResolvers.connection(),
    userPagination: UserTC.mongooseResolvers.pagination(),
};

/**
 * GraphQL mutations for creating, updating, and removing User data.
 * @type {Object}
 * @property {Function} userCreateOne - graphql-compose-mongoose resolver for creating a new User
 * @property {Function} userCreateMany - graphql-compose-mongoose resolver for creating multiple new User
 * @property {Function} userUpdateById - graphql-compose-mongoose resolver for updating a User document by their ID
 * @property {Function} userUpdateOne - graphql-compose-mongoose resolver for updating a single User that matches the provided filter
 * @property {Function} userUpdateMany - graphql-compose-mongoose resolver for updating multiple User that match the provided filter
 * @property {Function} userRemoveById - graphql-compose-mongoose resolver for removing a User by their ID
 * @property {Function} userRemoveOne - graphql-compose-mongoose resolver for removing a single User that matches the provided filter
 * @property {Function} userRemoveMany - graphql-compose-mongoose resolver for removing multiple User documents that match the provided filter
 */
export const userMutation ={
    userCreateOne: UserTC.mongooseResolvers.createOne(),
    userCreateMany: UserTC.mongooseResolvers.createMany(),
    userUpdateById: UserTC.mongooseResolvers.updateById(),
    userUpdateOne: UserTC.mongooseResolvers.updateOne(),
    userUpdateMany: UserTC.mongooseResolvers.updateMany(),
    userRemoveById: UserTC.mongooseResolvers.removeById(),
    userRemoveOne: UserTC.mongooseResolvers.removeOne(),
    userRemoveMany: UserTC.mongooseResolvers.removeMany(),
};