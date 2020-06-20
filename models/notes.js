const mongoose = require('mongoose');
const { dnsPrefetchControl } = require('helmet');
const Schema = mongoose.Schema


const NoteSchema = new Schema({
    content:{type:String,required:[true]},
    author:{type:mongoose.Schema.Types.ObjectId,ref: 'Users',required:[true]},
    favoritedBy:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Users'
    }],
    favoriteCount:{type:Number,default:0}

    },
    {
        timestamps:true
    }
);


const Notes = mongoose.model('notes',NoteSchema);


module.exports = Notes;



