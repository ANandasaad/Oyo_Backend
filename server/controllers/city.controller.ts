import { RequestHandler } from "express";
import { CityLogic } from "../business.logic/city.business.logic";

export const CityController: {
  createCity: RequestHandler;
  deleteCity: RequestHandler;
  getCityById: RequestHandler;
  updateCity: RequestHandler;
  getCities: RequestHandler;
} = {
  async createCity(req, res, next) {
    try {
      const input = req.body;
      const response = await CityLogic.createCity({ input });
      res.json({
        success: true,
        message: "City created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteCity(req, res, next) {
    try {
      const cityId = req.params.id;
      const response = await CityLogic.deleteCity({ cityId });
      res.json({
        success: true,
        message: "City deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCityById(req, res, next) {
    try {
      const cityId = req.params.id;
      const response = await CityLogic.getCityByID({ cityId });
      res.json({
        success: true,
        message: "Successfully fetch city data",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCities(req, res, next) {
    try {
      const response = await CityLogic.getAll();
      res.json({
        success: true,
        message: "Successfully fetch cities data",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateCity(req, res, next) {
    try {
      const cityId = req.params.id;
      const input = req.body;
      const response = await CityLogic.updateCity({ cityId, input });
      res.json({
        success: true,
        message: "Successfully updated city",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};
