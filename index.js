const express = require('express');
const app = express();
const {ApolloServer,gql} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers/index')
require('dotenv').config();
const db = require('./util/db');


db.connect(process.env.DB_HOST)

const port = process.env.PORT||4000;

const server = new ApolloServer({typeDefs,resolvers});

server.applyMiddleware({app,path:'/api'});

app.listen(port,()=>{console.log(`GraphQL server running at  http://localhost${port}/${server.graphqlPath}`)});


