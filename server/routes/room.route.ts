import express from "express";
import { RoomController } from "../controllers/room.controller";
const router = express.Router();
router.post("/create-room", RoomController.createRoom);
router.delete("/delete-room/:id", RoomController.deleteRoom);
export default router;
