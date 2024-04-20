const mongoose = require("mongoose")


const BannerSchema = new mongoose.Schema({
    titlle : String,
    link : URL,
    status :{
        type : String,
        enum :['active','inactive']
    },
    image: String,
    createdBy :{
        type : mongoose.Types.ObjectId,
        ref: "Banner",
        default : null
    },
    updatedBy:{
        type : mongoose.Types.ObjectId,
        ref: "Banner",
        default : null
    }
},{
    timestamps:true,        //created, updated keys are auto added
    autoCreate:true,          // created the table
    autoIndex : true 
})
const bannerModel = mongoose.model("Banner",BannerSchema)
module.exports = BannnerModel