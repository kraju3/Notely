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
    favorites:[Note!]!

}
type User{
    id:ID!
    firstname:String!
    lastname:String!
    email:String!
    username:String!
    avatar:String
    notes:[Note!]!
    favorites:[Note!]!
}
type Note {
        id: ID!
        content:String!
        author:User!
        favoriteCount:Int!
        favoritedBy:[User!]
        createdAt:DateTime!
        updatedAt:DateTime!
      
}
type Mutation {
    CreateNote(content:String!):Note!
    DeleteNote(id:ID!):Boolean!
    UpdateNote(id:ID!,content:String!):Note!
    signUp(firstname:String!,lastname:String!,email:String!,username:String!,password:String!):String!
    signIn(username:String!,email:String,password:String!):String!
    toggleFavorite(id:ID!):Note!
}`



module.exports = typeDefs