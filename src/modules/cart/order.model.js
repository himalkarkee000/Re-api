const { required } = require("joi")
const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    buyerId : {
        type :mongoose.Types.ObjectId,
        ref :"User",
        required:true
    },
    cartDetail:{
        type : mongoose.Types.ObjectId,
        ref :"CartDetail",
        required : true
    },
    subTotal :{
        type : Number,
        required: true,
        min : 1
    },
    discount :{
        type : Number,
        min : 0,
        default : null
    },
    deliveryCharge:{
        type : Number,
        min: 100,
        default:100
    },
    totalAmount :{
        type : Number,
        min : 0,
        default:0
    },
    isPaid :{
        type : Boolean,
        default: false
    },
    paymentMethod :{
        type : String,
        enum :["cod","online","phonepay","bank"],
        default :"cod"
    },
    status :{
        type : String,
        enum :['pending','ordered','cancelled','delivered']
    },
    createdBy :{
        type : mongoose.Types.ObjectId,
        ref:"User",
        default : null
    },
    updatedBy :{
        type : mongoose.Types.ObjectId,
        ref:"User",
        default : null
    }

},{
    timestamps : true,
    autoIndex :true,
    autoCreate:true


})
const orderModel = mongoose.model("Order",OrderSchema)
module.exports = orderModel