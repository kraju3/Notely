const bcrypt = require('bcrypt');


const queries = {
    Query:{
        notes:async (parent,args,{models})=>{
            return await models.NoteModel.find().limit(100);
        },
        note: async (parent,args,{models})=>{
            return await models.NoteModel.findById({_id:args.id})
        },
        getUser:async (parent,args,{models})=>{
            console.log(args.username)
            let User = await models.UserModel.findOne({username:args.username})
            console.log(User)
            return User
        },
        users:async(parent,args,{models})=>{
            return await models.UserModel.find({}).limit(100);
        },
        me:async(parent,args,{models,user})=>{

            return await models.UserModel.findById(user.id);

        },
        favorites:async(parent,args,{models,user})=>{
            const User = await models.UserModel.findById(user.id)
            return User.favorites
        },
        noteFeed:async (parent,{cursor},{models})=>{
            const limit = 10; //per page

            let hasNextPage = false;
            let cursorQuery = {}
            if(cursor){
               cursorQuery = {_id:{$lt:cursor}}; 
            }
            let notes = await models.NoteModel.find(cursorQuery).sort({_id:-1}).limit(limit+1)

            if (notes.length>limit){
                hasNextPage = true
                notes = notes.slice(0,-1); 
            }
            
            const newCursor = notes[notes.length-1]._id

            return{
                notes,
                cursor:newCursor,
                hasNextPage
            }
        }

    }

};

module.exports = queries