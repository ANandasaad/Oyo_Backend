import express from "express";
import { CityController } from "../controllers/city.controller";
const router = express.Router();
router.post("/create-city", CityController.createCity);
router.delete("/delete-city/:id", CityController.deleteCity);
router.get("/get-all-cities", CityController.getCities);
router.get("/get-city-by-id/:id", CityController.getCityById);
export default router;
