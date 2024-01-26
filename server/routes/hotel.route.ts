import express from "express";
import { HotelController } from "../controllers/hotel.controller";
const router = express.Router();
router.post("/create-hotel", HotelController.createHotel);
router.delete("/delete-hotel/:id", HotelController.deleteHotel);
router.get("/get-hotels", HotelController.getAllHotel);
router.get("/get-hotel-by-id/:id", HotelController.getHotelById);

export default router;
