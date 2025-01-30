import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    bio:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    profilePicture:{
        type:String,
        default:"default.jpg"
    },
    mobile:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    }
})

const Profile = mongoose.model("Profile",profileSchema);
export default Profile;