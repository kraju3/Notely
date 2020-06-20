const queries = require('./query');
const mutations = require('./mutations')
const Note = require('./notes');
const User = require('./users');
const {GraphQLDateTime} = require('graphql-iso-date');


module.exports = {
    Query:queries.Query,
    Mutation:mutations.Mutation,
    Note,
    User,
    DateTime:GraphQLDateTime
}