import { RequestHandler } from "express";
import { RatingLogic } from "../business.logic/rating.business.logic";
import { UploadedFile } from "express-fileupload";

export const RatingController: {
  createRating: RequestHandler;
  deleteRating: RequestHandler;
  updateRating: RequestHandler;
  getRatingById: RequestHandler;
  getAllRating: RequestHandler;
} = {
  async createRating(req, res, next) {
    try {
      const input = req.body;
      const userId = req.user?.id as string;
      const images = req.files?.images as UploadedFile[];
      const response = await RatingLogic.createRating({
        input,
        images,
        userId,
      });
      res.json({
        success: true,
        message: "Rating created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteRating(req, res, next) {
    try {
    } catch (error) {}
  },
  async updateRating(req, res, next) {
    try {
    } catch (error) {}
  },
  async getAllRating(req, res, next) {
    try {
    } catch (error) {}
  },
  async getRatingById(req, res, next) {
    try {
    } catch (error) {}
  },
};
