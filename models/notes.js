const mongoose = require('mongoose');
const { dnsPrefetchControl } = require('helmet');
const Schema = mongoose.Schema


const NoteSchema = new Schema({
    content:{type:String,required:[true]},
    author:{type:String,required:[true]}
    },
    {
        timestamps:true
    }
);


const Notes = mongoose.model('notes',NoteSchema);


NoteSchema.methods.findNote = async function  (id){
   const response = await Notes.findById({id:id})
   console.log(response)
}

NoteSchema.methods.createNote = async function (id,content,author){

    new Notes({
        id,author,content
    }).save((error)=>{
        console.error(error)
        console.log("Error on saving the document to the database");    
    })
}


NoteSchema.methods.findAllNote = async function (){
    const response = await Notes.find()
    return response.map(doc =>{
        return {
            id:doc.id,
            content:doc.content,
            author:doc.author
        }
    });

}

module.exports = Notes;



