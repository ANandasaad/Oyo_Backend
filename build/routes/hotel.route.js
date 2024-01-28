"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_controller_1 = require("../controllers/hotel.controller");
const router = express_1.default.Router();
router.post("/create-hotel", hotel_controller_1.HotelController.createHotel);
router.delete("/delete-hotel/:id", hotel_controller_1.HotelController.deleteHotel);
router.get("/get-hotels", hotel_controller_1.HotelController.getAllHotel);
router.get("/get-hotel-by-id/:id", hotel_controller_1.HotelController.getHotelById);
exports.default = router;
