const mongoose = require("mongoose")


const BrandSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        min : 2,
        unique: true
    },
    slug :{
        type: String,
        unique : true
    },
    status :{
        type : String,
        enum :['active','inactive'],
        default:"inactive"
    },
    homeSection: Boolean,
    image: {
        type : String,
        required : true
    },
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
const BrandModel = mongoose.model("Brand",BrandSchema)
module.exports = BrandModel