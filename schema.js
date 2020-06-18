const {gql} = require('apollo-server-express');
const model = require('./models/index');


let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
  ];


const typeDefs = gql`
type Query{
    notes:[Note!]!
    note(id:ID!):Note!

}
type Note {
        id: ID!
        content:String!
        author:String!
      
}
type Mutation {
    CreateNote(content:String!):Note!
    DeleteNote(author:String!):Note!
}

`




const resolvers = {
    Query:{
        notes:async ()=>{
            return await model.NoteModel.find();
        },
        note:(parent,args)=>{
            return notes.find(note=>note.id===args.id);
        }

    },
    Mutation:{
        CreateNote:async (parent,args)=>{
            return await model.NoteModel.create({
                content:args.content,
                author:"Kiran Raju"
            });
            
        },
        DeleteNote:async (parent,args)=>{
            return await model.NoteModel.deleteOne({author:args.author})

        }

    }

};

module.exports = {typeDefs,resolvers}