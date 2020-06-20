const express = require('express');
const app = express();
const {ApolloServer} = require('apollo-server-express');
const jwt = require('jsonwebtoken');


require('dotenv').config();
const db = require('./util/db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const DB_HOST = process.env.DB_HOST
const port = process.env.PORT||4000;


db.connect(DB_HOST)

const server = new ApolloServer(
    {typeDefs,
    resolvers,
    context:({req})=>{
        const user= getUser(req.headers.authorization)
        console.log(user)
        return { models,user};
}});
server.applyMiddleware({app,path:'/api'});


const getUser = token =>{
    if (token){
        try{
            return jwt.verify(token,process.env.JWT_SECRET)
        }catch(err){
            throw new Error('Session Invalid')
        }
    }
}

app.listen(port,()=>{console.log(`GraphQL server running at  http://localhost/${port}/${server.graphqlPath}`)});


