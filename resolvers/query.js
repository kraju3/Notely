const queries = {
    Query:{
        notes:async ()=>{
            return await model.NoteModel.find();
        },
        note: async (parent,args)=>{
            return await model.NoteModel.findById({_id:args.id})
        }

    }

};

module.exports = queries