import multer from 'multer';
import express from 'express';
const router = express.Router();
import {
    uploadProfilePicture,
    getMyProfile,
    updateProfileInfo,
    registerAdmin,
    loginAdmin,
    createCart,
    getCart,
    deleteCart,
    getAllProducts,
    createOrder, getMyOrders, getProductInfo
} from "../controllers/admin.controller.js";

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


router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin);
router.route("/get_My_Profile").get(getMyProfile);
router.route("/uploadProfilePicture").post(upload.single('profile_picture'), uploadProfilePicture);
router.route("/updateProfileInfo").post(updateProfileInfo);
router.route("/getAllProducts").get(getAllProducts);
router.route("/createCart").post(createCart);
router.route("/getCart").get(getCart);
router.route("/deleteCart").delete(deleteCart);
router.route("/createOrder").post(createOrder);
router.route("/getAdminOrder").get(getMyOrders);
router.route("/getProductInfo").get(getProductInfo);

export default router;