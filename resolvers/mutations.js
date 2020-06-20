const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');

const gravatar = require('../util/gravatar');
require('dotenv').config()

const saltRounds = 10;

const Authorization = async (args,models)=>{
    try{
    const User = await models.UserModel.findOne({username:args.username,email:args.email});
    if(!User){
        throw new AuthenticationError('Error signing in')
    }
    const hashed = await bcrypt.compare(args.password,User.password);
    if (hashed){
        return jwt.sign({id:User._id},process.env.JWT_SECRET);

    }else{
        throw new AuthenticationError('Error signing in due to wrong password')
    }}
    catch(error){
        console.log(error)
        throw new Error("something wrong with logging in")
    }

}


const User = async(args,models)=>{
    try{
    let email = args.email.trim().toLowerCase();
    let username = args.username.trim().toLowerCase()
    const avatar = gravatar(email)
    const hash= await bcrypt.hash(args.password,saltRounds);

    const user = await models.UserModel.create({
        username,
        firstname:args.firstname,
        lastname:args.lastname,
        email,
        password:hash,
        avatar
    });

    const generateJWT = jwt.sign({id:user._id},process.env.JWT_SECRET)

    return generateJWT
    }catch(error){
        console.log(error);
        throw new Error('Error creating account');

    }

}


const mutations = {
    Mutation:{
        CreateNote:async (parent,args,{models,user})=>{
            if (!user){
                throw new AuthenticationError("You must be signed in to create a new Note");
            }

            return await models.NoteModel.create({
                content:args.content,
                author:mongoose.Types.ObjectId(user.id)
            });
            
        },
        DeleteNote:async (parent,{id},{models,user})=>{

            if(!user){
                throw new AuthenticationError("You must be signed in to create a new Note");
            }
                const note = models.NoteModel.findOneAndRemove({_id:id})

            if (note && String(note.author)!== user.id){
                throw new ForbiddenError("You do not have access to delete this note")
            }
            try{
                await note.remove()
                return true
            }catch(err){
                return false;
            }
            

        }
        ,
        UpdateNote:async (parent,{id,content},{models,user})=>{
            if(!user){
                throw new AuthenticationError("You must be signed in to create a new Note");
            }
         
            const note = await models.NoteModel.findById(id);

            if(note && String(note.author)!==user.id){
                throw new ForbiddenError("You do not have permission to  udpate this note");
            }
            
            return await models.NoteModel.findOneAndUpdate({_id:id},{
                    $set: {
                        content
                    }
            },{new:true});
           
        },
        signUp:async (parent,args,{models})=>{
            //add functionality of adding it to the database
            return User(args,models);
        },
        signIn:async(parent,args,{models})=>{
            return Authorization(args,models)
        }

    }

};

module.exports = mutations