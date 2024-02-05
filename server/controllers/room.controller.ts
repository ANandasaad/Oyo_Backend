import { RequestHandler } from "express";
import { RoomLogic } from "../business.logic/room.business.logic";

export const RoomController: {
  createRoom: RequestHandler;
  deleteRoom: RequestHandler;
  updateRoom: RequestHandler;
  getRoomById: RequestHandler;
  getAllRooms: RequestHandler;
  bulkUploadRooms: RequestHandler;
} = {
  async createRoom(req, res, next) {
    try {
      const input = req.body;
      const response = await RoomLogic.createRoom({ input });
      res.json({
        success: true,
        message: "Room created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteRoom() {},
  async updateRoom() {},
  async getRoomById() {},
  async bulkUploadRooms() {},
  async getAllRooms() {},
};
