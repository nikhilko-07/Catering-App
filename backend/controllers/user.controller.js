import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Product from "../models/product.model.js";
import Order from "../models/Order.model.js";

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
        const newUser = new User({
            username,
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save();
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
        const usertoken = crypto.randomBytes(32).toString('hex');
        await User.updateOne({_id: user._id}, {usertoken})
        return res.status(201).json({message:" User Login successfully", usertoken});
    }catch(err){
        return res.status(400).send({message: err.message});
    }
}

export const createProduct = async (req, res) => {
    try {
        const {usertoken} = req.body;
        const user = await User.findOne({usertoken});
        if (!user) {
            res.status(400).json({message:"User not found"});
        }
        const product = new Product({
            userId: user._id,
            name: req.body.name,
            Price: req.body.price,
            discountedPrice: req.body.discountedprice,
            Description: req.body.description,
            media: req.file ? req.file.filename : '',
            fileTypes: req.file ? req.file.mimetype.split('/')[1] : '',
        })
        await product.save();
        return res.status(201).json({message:"Product successfully saved"});

    }catch(err) {
        return res.status(400).json({message: err.message})
    }
}

export const getUserProduct = async (req, res) => {
    try {
        const {usertoken} = req.headers;
        if(!usertoken){
            console.log(usertoken);
            // return res.status(400).json({error: 'UserToken is required'});
        }
        const user = await User.findOne({usertoken});
        if(!user){
            return res.status(400).json({error: 'User does not exist'});
        }
        const product = await Product.find({userId: user._id});
        if(!product || product.length===0){
            return res.status(400).json({error: 'You dont have any product'});
        }
        product.reverse();
        return res.status(201).json({product});
    }catch(err){
        return res.status(400).send({message: err.message});
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const { usertoken } = req.headers;

        if (!usertoken) {
            return res.status(400).json({ error: 'User token is required' });
        }
        const user = await User.findOne({ usertoken });
        if (!user) {
            return res.status(400).json({ error: 'Invalid user token' });
        }
        const products = await Product.find({ userId: user._id });
        if (!products.length) {
            return res.status(400).json({ error: 'You do not have any products' });
        }
        const productIds = products.map(product => product._id);
        const orders = await Order.find({ productId: { $in: productIds } }).populate("productId", "name media discountedPrice");
        if (!orders.length) {
            return res.status(400).json({ error: 'No orders found for your products' });
        }
        orders.reverse();
        return res.status(200).json({ orders });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const changeStatus = async (req, res) => {
    const {usertoken, orderid} = req.body;
    if(!usertoken){
        return res.status(400).json({error: 'Token is required'});
    }
    const user = await User.findOne({usertoken});
    if (!user) {
        return res.status(400).json({error: 'user is required'});
    }
    if(!orderid ){
        return res.status(400).json({error: 'orderId is required'});
    }
    const order = await Order.findOne({_id: orderid});
    if (!order) {
        return res.status(400).json({error: 'order is required'});
    }
    order.status = true;
    await order.save();

    return res.status(200).json({message: 'Order status updated successfully', order,});
}


