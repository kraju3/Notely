const mongoose = require('mongoose')

module.exports = {
    connect:(DB_HOST)=>{
        mongoose.set('useNewUrlParser',true);
        mongoose.set('useFindAndModify',false)
        mongoose.set('useCreateIndex',true)
        mongoose.set('useUnifiedTopology',true)

        mongoose.connect(DB_HOST,(err)=>{
            if (err){
                throw err
                process.exit();
            }
            else{
                console.log("Successfully Connected to MongoDB")
            }
        })

        mongoose.connection.on('error',err =>{
            console.log(err)
            console.log('MongoDB connection error. Please make sure MongoDB is running')
            process.exit()
        });
    },
    close:()=>{
        mongoose.connection.close((err)=>{
            console.log(error)
            console.log("MongoDB closing connection error")
        })
    }
}


