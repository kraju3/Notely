const mutations = {
    Mutation:{
        CreateNote:async (parent,args)=>{
            return await model.NoteModel.create({
                content:args.content,
                author:args.author
            });
            
        },
        DeleteNote:async (parent,args)=>{
            return await model.NoteModel.findByIdAndDelete(args.id)

        }
        ,
        UpdateNote:async (parent,args)=>{
            return await model.NoteModel.findByIdAndUpdate(args.id,{
                content:args.content,
                author:args.author
            });
        }

    }

};

module.exports = mutations