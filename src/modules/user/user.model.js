const { ref } = require("joi")
const mongoose = require("mongoose")


const AddressSchema = new mongoose.Schema({
        houseNo : String,
        streetName : String,
        ruralDev : String,
        district : String,
        provience : String,
})
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require: true,
        min : 2,
        max : 50
    },
    email: {
        type : String,
        require: true,
        unique : true
    },
    password :{
        type: String,
        require : true
    },
    role :{
        type : String,
        enum : ['seller','customer','admin'],
        default : 'customer'

    },
    activationToken:{
        type : String
    },
    status :{
        type : String,
        enum : ['active','inactive']
    },
    phone :String,
    image : String,
    address :{
        shippingAddress :AddressSchema,
        billingAddress :AddressSchema
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
    autoIndex : true        // indexing
})

//Model Name ====> Captial singular name 
// Table  name ====> small pular name 
// e.g User ====> users
// if you want to change the table name, third arg of model
// is collection name

const UserModel = mongoose.model("User",UserSchema
//, "authUsers"
)
module.exports = UserModel