
module.exports={
    notes: async(User,args,{models})=>{
        return await models.NoteModel.find({author:User._id}).sort({_id:-1});
    },
    favorites: async(User,args,{models})=>{
        return await models.NoteModel.find({_id:{$in:User.favorites}}).sort({_id:-1});
    }


}