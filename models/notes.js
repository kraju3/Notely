const mongoose = require('mongoose');
const { dnsPrefetchControl } = require('helmet');
const Schema = mongoose.Schema


const NoteSchema = new Schema({
    content:{type:String,required:[true]},
    author:{type:mongoose.Types.ObjectId,ref: 'Users',required:[true]}
    },
    {
        timestamps:true
    }
);


const Notes = mongoose.model('notes',NoteSchema);


module.exports = Notes;


