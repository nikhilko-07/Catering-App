import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import Profile from "../models/profile.model.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username)
            return res.status(400).json({ message: "All fields required" });

        const admin = await Admin.findOne({ email });
        if(admin){
            return res.status(400).send("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            name,
            email,
            password:hashedPassword
        })
        await newAdmin.save();
        const profile = new Profile({ adminId: newAdmin._id });
        await profile.save();
        return res.status(201).json({message: "successfully registered"});
    }catch(err){
        return res.status(400).json({message: err.message})
    }
};

export const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send("email and password is required");
        }
        const admin = await Admin.findOne({ email });
        if(!admin){
            return res.status(400).send("User not exists");
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).send("Invalid credentials");
        }
        const token = crypto.randomBytes(32).toString("hex");
        await Admin.updateOne({ _id: admin._id }, { token });
        return res.json({message: "successfully logged in", token});
    }catch(err){
        return res.status(400).json({message: err.message })
    }
};


// Assuming you are using Express.js
export const getMyProfile = async (req, res) => {
    try {
        const { token } = req.query;
        console.log(token)
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const admin = await Admin.findOne({ token: token });
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        const adminProfile = await Profile.findOne({ adminId: admin._id })
            .populate('adminId', 'name email username profilePicture');

        if (!adminProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        return res.json({ profile: adminProfile });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const uploadProfilePicture = async (req, res) => {
    try {
        console.log(req.file); // Debugging: Check if file is received
        const { token } = req.body;
        const admin = await Admin.findOne({ token: token });

        if (!admin) {
            return res.status(400).send("Admin not exists");
        }

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        admin.profilePicture = req.file.filename;
        await admin.save();

        return res.json({ message: "Successfully uploaded" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
export const updateProfileInfo = async (req, res) => {
    try {
        const { token, ...newProfileData } = req.body;
        const adminProfile = await Admin.findOne({ token: token }); // Ensure await is used
        if (!adminProfile) {
            console.log("Admin not found for token:", token); // Log if admin is not found
            return res.status(400).send("Admin not exists");
        }
        const profileToUpdate = await Profile.findOne({ adminId: adminProfile._id });
        if (!profileToUpdate) {
            return res.status(400).send("Profile not found");
        }
        Object.assign(profileToUpdate, newProfileData);
        await profileToUpdate.save();
        return res.json({ message: "successfully updated profile" });

    } catch (err) {
        console.error("Error updating profile:", err); // Log the error
        return res.status(400).send("User not found");
    }
}

// Assuming you have already imported necessary modules like express, Admin, and Profile

export const getProfileBasedOnUsername = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const admin = await Admin.findOne({ username }).select('-token -password');
        if (!admin) {
            return res.status(404).json({ error: "Admin not exists" });
        }
        const profile = await Profile.findOne({adminId: admin})

        return res.json({ "profile": profile, admin });

    } catch (err) {
        console.error("Error fetching profile:", err); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getAdminById = async (req, res) => {
    try {
        const { adminId } = req.query; // Or use req.params if it's a path parameter

        if (!adminId) {
            return res.status(400).send("Admin ID is required");
        }

        // Use .select() to exclude the token field
        const admin = await Admin.findById(adminId).select('-token -password');

        if (!admin) {
            return res.status(404).send("Admin not found");
        }
        return res.json({ admin });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        return res.status(500).send("Internal server error");
    }
}