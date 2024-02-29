import { UploadedFile } from "express-fileupload";
import { body } from "express-validator";
const imageValidation = (images: UploadedFile[]) => {
  console.log(images);
  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new Error("Please upload at least one image");
  }
  for (const image of images) {
    if (!image || !image.mimetype.startsWith("image/")) {
      throw new Error("Please upload only images");
    }
  }
  return true;
};
export const RatingValidation = {
  create: [
    body("hotelId").trim().notEmpty().withMessage("hotelId is required").bail(),
    body("rating").trim().notEmpty().withMessage("rating is required").bail(),
    body("review").trim().notEmpty().withMessage("review is required").bail(),
    // Custom validation for images
    body()
      .custom((value, { req }) => {
        if (!req.files || !req.files.images) {
          throw new Error("images are required");
        }
        return true;
      })
      .withMessage("images are required"),
  ],
};
