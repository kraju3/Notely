const queries = require('./query');
const mutations = require('./mutations')
const {GraphQLDateTime} = require('graphql-iso-date');


module.exports = {
    Query:queries.Query,
    Mutation:mutations.Mutation,
    DateTime:GraphQLDateTime
}