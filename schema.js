const {gql} = require('apollo-server-express');


const typeDefs = gql`
scalar DateTime
scalar Email

type Query{
    notes:[Note!]!
    note(id:String!):Note!
    getUser(username:String!):User!
    users:[User!]!
    me:User!

}
type User{
    id:ID!
    firstname:String!
    lastname:String!
    email:String!
    username:String!
    avatar:String
    notes:[Note!]!
}
type Note {
        id: ID!
        content:String!
        author:String!
        createdAt:DateTime!
        updatedAt:DateTime!
      
}
type Mutation {
    CreateNote(content:String!):Note!
    DeleteNote(id:ID!):Boolean!
    UpdateNote(id:ID!,content:String!):Note!
    signUp(firstname:String!,lastname:String!,email:String!,username:String!,password:String!):String!
    signIn(username:String!,email:String,password:String!):String!
}`



module.exports = typeDefs