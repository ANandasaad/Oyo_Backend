import express from "express";
import { authentication } from "../middleware/authenticate.middleware";
import { RatingController } from "../controllers/rating.controller";
import { RatingValidation } from "../validations/rating.validations";
import { validate } from "../middleware/validation.middleware";

const router = express.Router();
router.post(
  "/create-rating",

  authentication.customer,
  RatingValidation.create,
  validate,
  RatingController.createRating
);
export default router;
