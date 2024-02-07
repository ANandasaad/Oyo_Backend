import { RequestHandler } from "express";
import { HotelBusinessLogic } from "../business.logic";
import { UploadedFile } from "express-fileupload";

export const HotelController: {
  createHotel: RequestHandler;
  deleteHotel: RequestHandler;
  updateHotel: RequestHandler;
  getHotelById: RequestHandler;
  getAllHotel: RequestHandler;
  bulkUploadHotel: RequestHandler;
  hotelByCityId: RequestHandler;
  getHotelByPopularlocalityId: RequestHandler;
} = {
  async createHotel(req, res, next) {
    try {
      const input = req.body;
      const images = req.files?.images as UploadedFile[];
      const response = await HotelBusinessLogic.createHotel({ input, images });
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
  async hotelByCityId(req, res, next) {
    try {
      const cityId = req.params.id;
      const response = await HotelBusinessLogic.hotelByCityId({ cityId });
      res.json({
        success: true,
        message: "Hotel by city fetched successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getHotelByPopularlocalityId(req, res, next) {
    try {
      const popularlocalityId = req.params.id;
      const response = await HotelBusinessLogic.getHotelByPopularlocalityId({
        popularlocalityId,
      });
      res.json({
        success: true,
        message: "Popular locality fetched successfully",
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
      const { cityName } = req.query;
      const response = await HotelBusinessLogic.getAllHotels(
        cityName as string
      );
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
