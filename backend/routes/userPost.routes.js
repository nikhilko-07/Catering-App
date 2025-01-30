import {Router} from 'express';
import {getAdminPostById, getAllAdminsPosts} from "../controllers/userPost.controller.js";

const router = Router();

router.route("/getAllAdminsPost").get(getAllAdminsPosts);
router.route("/getadminpostbyid").get(getAdminPostById);

export default router;