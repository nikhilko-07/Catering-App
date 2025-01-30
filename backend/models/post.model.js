import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    body:{
        type:String,
        required:true
    },
    soilType:{
        type:String,
        required:true
    },
    media:{
        type:String,
        default:''
    },
    active:{
        type:Boolean,
        default:true
    },
    filetype:{
        type:String,
        default:''
    }

})

const Post = mongoose.model("Post", postSchema);
export default Post;