import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    Usertoken:{
        type: String,
        default:''
    }
})

const User = new mongoose.model('User',UserSchema);
export default User;