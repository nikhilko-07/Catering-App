
import bcrypt from "bcrypt";
import crypto from "crypto";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import Profile from "../models/profile.model.js";
import Admin from "../models/admin.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Order from "../models/Order.model.js";

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

export const getMyProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({token });
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

export const getAllProducts = async (req, res) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).send("No token");
        }
        const product = await Product.find();
        if (!product) {
            return res.status(400).send("No product");
        }
        product.reverse();
        return res.json({product});

    }catch(err){
        return res.status(400).send("No Products Found");
    }
}

export const createCart = async (req, res) => {
    try {
        const {token, productid} = req.headers;
        if (!token) {
            return res.status(400).send("Token is required");
        }
        const admin = await Admin.findOne({token});
        if (!productid) {
            return res.status(400).send("Productid is required");
        }

        const newCart = new Cart({
            adminId : admin._id,
            productId: productid
        });
        await newCart.save();
        return res.json({ message: "successfully created cart" });

    }catch(err){
        return res.status(400).send(err.message);
    }
}

export const getCart = async (req, res) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(400).send("Token is required");
        }
        const admin = await Admin.findOne({token});
        if (!admin) {
            return res.status(400).send("User not found");
        }
        const getCart = await Cart.find({adminId:admin._id }).populate("productId" ,"name media Price discountedPrice").select("-adminId");
        if (!getCart) {
            return res.status(400).send("No cart found with user id");
        }
        getCart.reverse();
        return res.json({getCart});
    }catch(err){
        return res.status(400).send("Error getting cart");
    }
}

export const deleteCart = async (req, res) => {
    try {
        const {token, cartid} = req.headers;
        if (!token) {
            return res.status(400).send("Token is required");
        }
        const admin = await Admin.findOne({ token });
        if (!admin) {
            return res.status(400).send("User not found");
        }
        const cart = await Cart.findOne({_id: cartid});
        if (!cart) {
            return res.status(400).send("No cart found with user id");
        }
        if(cart.adminId.toString() !== admin._id.toString()) {
            return res.status(400).send("Admin not found");
        }
        await Cart.deleteOne({_id: cart._id});
        return res.json({ message: "successfully deleted" });

    }catch(err){
        return res.status(400).send("Token is required");
    }
}

export const createOrder = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { productid, name, address, phone, pincode} = req.headers;
        if (!token) {
            return res.status(400).send("Token is required");
        }
        const admin = await Admin.findOne({token });
        if (!admin) {
            return res.status(400).send("Token is required");
        }
        const product = await Product.findOne({_id: productid});
        if (!product) {
            return res.status(400).send("Productid is required");
        }
        const newOrder = new Order({
            adminId:admin._id,
            productId:product._id,
            name:name,
            address:address,
            phone:phone,
            pinCode:pincode,
        })
        await newOrder.save();
        return res.json({ message: "successfully created order" });
    }catch (err){
        return res.status(400).send(err.message);
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).send("Token is required");
        }
        const admin = await Admin.findOne({token});
        if (!admin) {
            return res.status(400).send("Token is required");
        }
        const order = await Order.find({adminId: admin._id}).populate("productId", "name media Price discountedPrice").select("-adminId");
        if (!order) {
            return res.status(400).send("You haven't any orders yet");
        }
        order.reverse();
        return res.json({order});
    }catch(err){
        return res.status(400).send("Token is required");
    }
}

export const getProductInfo = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { productid } = req.headers;

        if (!token) {
            return res.status(400).send("Token is required");
        }

        const admin = await Admin.findOne({ token });
        if (!admin) {
            return res.status(401).send("Unauthorized: Invalid token");
        }

        if (!productid) {
            return res.status(400).send("Product ID is required");
        }

        const product = await Product.findOne({ _id: productid }).select("name media Price discountedPrice Description");
        if (!product) {
            return res.status(404).send("There is no product");
        }

        return res.json( product );
    } catch (err) {
        console.error("Error in getProductInfo:", err);
        return res.status(500).send("Internal Server Error");
    }
};
