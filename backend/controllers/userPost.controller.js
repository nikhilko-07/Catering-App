import Post from "../models/post.model.js";


export const getAllAdminsPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("adminId", 'username name email profilePicture soilType')
        return res.status(200).json({posts});
    }catch(err) {
        res.status(400).json({message: err.message});
    }
}

export const getAdminPostById = async (req, res) => {
    try {
        const {_id} = req.query;
        if (!_id) {
            return res.status(404).json({message: 'Please Provide _id'});
        }
        const post = await Post.findOne({_id})
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        return res.status(200).json({"postById":post});
    }catch(err) {
        return res.status(400).json({message: err.message});
    }
}