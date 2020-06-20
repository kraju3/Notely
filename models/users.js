const mongoose= require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String,required:[true,'Please Provide a Username'],index:{unique: true}},
    firstname:{type:String,required:[true,'Please Provide a First Name']},
    lastname:{type:String,required:[true,'Please provide a Last Name']},
    email:{type:String,required:[true,"Please provide a Email"],index:{unique: true}},
    password:{type:String,required:[true,"Please provide a Password"]},
    avatar:{
        type: String
    },
    notes:[{
        type:mongoose.Types.ObjectId,ref:'notes'
    }],
    favorites:[{
        type:mongoose.Schema.Types.ObjectId,ref:'notes'
    }]
},{timestamps:true});

const UserModel = mongoose.model('Users',UserSchema);


module.exports = UserModel;