import {Router} from 'express';
import {getAdminProfile, getUserInfo, loginUser, registerUser} from "../controllers/user.controller.js";


const router = Router();


router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/getuserInfo").get(getUserInfo);
router.route("/getPostAdminId").get(getAdminProfile);

export default router;