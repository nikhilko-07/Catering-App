import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    media:{
        type:String,
        default:''
    },
    filetype:{
        type:String,
        default:''
    }

})

const Product = mongoose.model("Product", productSchema);
export default Product;