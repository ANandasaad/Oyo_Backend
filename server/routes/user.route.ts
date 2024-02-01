import express from "express";
import { UserController } from "../controllers/user.controller";
const router = express.Router();
router.post("/sign-up", UserController.SignUp);
router.post("/sign-in", UserController.signIn);
export default router;
