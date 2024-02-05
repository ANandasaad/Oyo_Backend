import express from "express";
import { UserController } from "../controllers/user.controller";
import { authentication } from "../middleware/authenticate.middleware";
const router = express.Router();
router.post("/sign-up", UserController.SignUp);
router.post("/sign-in", UserController.signIn);
router.get("/self", authentication.any, UserController.self);
export default router;
