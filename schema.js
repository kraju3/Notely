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
    note(id:String!):Note!

}
type Note {
        id: ID!
        content:String!
        author:String!
      
}
type Mutation {
    CreateNote(content:String!,author:String!):Note!
    DeleteNote(author:String!):Note!
    UpdateNote(content:String!,author:String!):Note!
}

`




const resolvers = {
    Query:{
        notes:async ()=>{
            return await model.NoteModel.find();
        },
        note: async (parent,args)=>{
            return await model.NoteModel.findById({_id:args.id})
        }

    },
    Mutation:{
        CreateNote:async (parent,args)=>{
            return await model.NoteModel.create({
                content:args.content,
                author:args.author
            });
            
        },
        DeleteNote:async (parent,args)=>{
            return await model.NoteModel.findByIdAndDelete(args.id)

        }
        ,
        UpdateNote:async (parent,args)=>{
            return await model.NoteModel.findByIdAndUpdate(args.id,{
                content:args.content,
                author:args.author
            });
        }

    }

};

module.exports = {typeDefs,resolvers}