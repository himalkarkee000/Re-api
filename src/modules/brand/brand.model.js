const mongoose = require('mongoose')


const BandSchema = new mongoose.Schema({
    titlle : String,
    slug : String,
    status :{
        type : String,
        enum :['active','inactive']
    },
    image: String,
    createdBy :{
        type : mongoose.Types.ObjectId,
        ref: "User",
        default : null
    },
    updatedBy:{
        type : mongoose.Types.ObjectId,
        ref: "User",
        default : null
    }
},{
    timestamps:true,        //created, updated keys are auto added
    autoCreate:true,          // created the table
    autoIndex : true 
})