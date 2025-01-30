import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Profile from "../models/profile.model.js";
import Admin from "../models/admin.model.js";

export const registerUser = async (req, res) => {
    try {
        const {username, name, email, password} = req.body;
        if(!username || !name || !email || !password ){
            return res.status(400).json({error: 'Field is required'});
        }
        const user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newuser = new User({
            username,
            name,
            email,
            password: hashedPassword,
        })
        await newuser.save();
        return res.status(201).json({message:" User successfully registered"});

    }catch(err){
        return res.status(400).send({message: err.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: 'Field is required'});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: 'Incorrect password'});
        }
        const Usertoken = crypto.randomBytes(32).toString('hex');
        await User.updateOne({_id: user._id}, {Usertoken})
        return res.status(201).json({message:" User Login successfully", Usertoken});
    }catch(err){
        return res.status(400).send({message: err.message});
    }
}

export const getAdminProfile = async (req, res) => {
    try {
        const { adminId } = req.query;

        if (!adminId) {
            return res.status(400).json({ error: 'Admin ID is required' });
        }

        console.log(`Searching for admin with ID: ${adminId}`);
        const admin = await Admin.findOne({ _id: adminId });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log(`Searching for profile with ID: ${adminId}`);
        const adminProfile = await Profile.findOne({ adminId: adminId });
        if (!adminProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Exclude password and token from adminInfo
        const { password, token, ...adminInfoWithoutSensitiveData } = admin.toObject();

        return res.status(200).json({
            adminProfile: adminProfile,
            adminInfo: adminInfoWithoutSensitiveData
        });
    } catch (err) {
        console.error('Error fetching admin profile:', err);
        return res.status(500).send({ error: 'Server error' });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const {Usertoken} = req.query;
        if(!Usertoken){
            return res.status(400).json({error: 'User token is required'});
        }
        const user = await User.findOne({Usertoken: Usertoken});
        if(!user){
            return res.status(400).json({error: 'User does not exist'});
        }
        user.populate('_id', "name, email")
        return res.json({userinfo : user});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}


