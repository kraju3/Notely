const bcrypt = require('bcrypt');


const queries = {
    Query:{
        notes:async (parent,args,{models})=>{
            return await models.NoteModel.find();
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
            return await models.UserModel.find({});
        },
        me:async(parent,args,{models,user})=>{

            return await models.UserModel.findById(user.id);

        }

    }

};

module.exports = queries