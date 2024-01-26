import { RequestHandler } from "express";
import { HotelBusinessLogic } from "../business.logic";

export const HotelController: {
  createHotel: RequestHandler;
  deleteHotel: RequestHandler;
  updateHotel: RequestHandler;
  getHotelById: RequestHandler;
  getAllHotel: RequestHandler;
  bulkUploadHotel: RequestHandler;
} = {
  async createHotel(req, res, next) {
    try {
      const input = req.body;
      const response = await HotelBusinessLogic.createHotel({ input });
      res.json({
        success: true,
        message: "Hotel created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteHotel(req, res, next) {
    try {
      const hotelId = req.params.id;
      const response = await HotelBusinessLogic.deleteHotel({ hotelId });
      res.json({
        success: true,
        message: "Hotel deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateHotel(req, res, next) {
    try {
    } catch (error) {}
  },
  async getHotelById(req, res, next) {
    try {
      const hotelId = req.params.id;
      const response = await HotelBusinessLogic.getHotelById({ hotelId });
      res.json({
        success: true,
        message: "Successfully retrieved hotel",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllHotel(req, res, next) {
    try {
      const response = await HotelBusinessLogic.getAllHotels();
      res.json({
        success: true,
        message: "Successfully retrieved all",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async bulkUploadHotel(req, res, next) {
    try {
    } catch (error) {}
  },
};
