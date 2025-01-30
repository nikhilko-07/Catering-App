import Post from '../models/post.model.js';
import Admin from '../models/admin.model.js';


export const createPost = async (req, res) => {
    try {
        const {token} = req.body;
        const admin = await Admin.findOne({token});
        if (!admin) {
            res.status(400).json({message:"Admin not found"});
        }
        const post = new Post({
            adminId: admin._id,
            body: req.body.body, // Ensure body is a string
            soilType: req.body.soilType,
            media: req.file ? req.file.filename : '',
            fileTypes: req.file ? req.file.mimetype.split('/')[1] : '',
        })
        await post.save();
        return res.status(201).json({message:"Post successfully saved"});

    }catch(err) {
        return res.status(400).json({message: err.message})
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('adminId', 'username name email profilePicture soilType')
        return res.status(200).json({posts})
    }catch(err) {
        return res.status(400).json({message:err.message})
    }
}

export const deletePost = async (req, res) => {
    try{
        const {token, post_id}= req.body;
        const admin = await Admin.findOne({token}).select("_id");
        if (!admin) {
            res.status(400).json({message:"Admin not found"});
        }
        const post = await Post.findOne({_id:post_id});
        if(!post) {
            res.status(400).json({message:"Post not found"});
        }
        if(post.adminId.toString() !== admin._id.toString()){
            return res.status(400).json({message:"Unauthorized"});
        }
        await Post.deleteOne({_id:post_id});
        return res.status(200).json({message:"Successfully deleted post"});
    }catch(err) {
        return res.status(400).json({message:err.message})
    }
}


export const getPostById = async (req, res) => {
    try {
        const { _id } = req.query; // Ensure _id is correctly destructured from req.body

        const post = await Post.findOne({ _id });
        if (!post) {
            return res.status(404).send("Post not exists");
        }

        return res.json({ "post" : post }); // Return the post directly if no population is needed

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).send("Internal Server Error");
    }
}

