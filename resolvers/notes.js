

module.exports = {
    author:async(note,args,{models})=>{
        return await models.UserModel.findById(note.author)
    },
    favoritedBy:async(note,args,{models})=>{
        return await models.UserModel.find({_id:{$in: note.favoritedBy}});
    }
}