import mongoose from "mongoose";


const orderModel = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean,
        default:false
    }
})

const Order = mongoose.model("Order", orderModel);
export default Order;