import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/create').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;