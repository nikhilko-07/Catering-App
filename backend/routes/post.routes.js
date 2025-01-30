import {Router} from 'express';
import multer from 'multer';
import {createPost, deletePost, getAllPosts, getPostById} from "../controllers/post.controller.js";

const router = Router();


const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, `uploads/`)
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    },
})

const upload  = multer({storage:storage})

router.route("/createPost").post(upload.single('media'),createPost);
router.route("/getAllPosts").get(getAllPosts);
router.route("/deletePost").delete(deletePost);
router.route("/getPost").get(getPostById);
export default router;