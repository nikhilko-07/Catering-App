import {Router} from 'express';
import {
    changeStatus,
    createProduct,
    getUserOrders,
    getUserProduct,
    loginUser,
    registerUser
} from "../controllers/user.controller.js";
import multer from "multer";


const router = Router();


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, `uploads/`)
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    },
})
const upload = multer({storage:storage});


router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/createProduct").post(upload.single('media'), createProduct)
router.route("/GetUserProduct").get(getUserProduct);
router.route("/getUserOrders").get(getUserOrders);
router.route("/changeStatus").post(changeStatus);
export default router;