const {gql} = require('apollo-server-express');

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
    DeleteNote(id:ID!):Note!
}

`




const resolvers = {
    Query:{
        notes:()=>notes,
        note:(parent,args)=>{
            return notes.find(note=>note.id===args.id);
        }

    },
    Mutation:{
        CreateNote:(parent,args)=>{
            let newNote = {id:String(notes.length + 1),content:args.content,author:"Kiran Raju"};

            notes.push(newNote)
            return newNote
        },
        DeleteNote:(parent,args)=>{
            deleteNote = notes.find(note=>note.id===args.id)
            notes = notes.filter(note=>{
                if (note.id!==args.id){
                    return note
                }
            })
            return deleteNote

        }

    }

};

module.exports = {typeDefs,resolvers}