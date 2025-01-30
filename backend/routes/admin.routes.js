import multer from 'multer';
import express from 'express';
const router = express.Router();
import {
    registerAdmin,
    loginAdmin,
    uploadProfilePicture,
    getMyProfile, updateProfileInfo, getAdminById, getProfileBasedOnUsername
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


router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/get_My_Profile").get(getMyProfile);
router.route("/uploadProfilePicture").post(upload.single('profile_picture'), uploadProfilePicture);
router.route("/updateProfileInfo").post(updateProfileInfo);
router.route("/getProfileOnUsername").get(getProfileBasedOnUsername);
router.route("/getProfileById").get(getAdminById);

export default router;