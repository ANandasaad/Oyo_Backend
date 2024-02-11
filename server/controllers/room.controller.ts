import { RequestHandler } from "express";
import { RoomLogic } from "../business.logic/room.business.logic";
import fileUpload, { UploadedFile } from "express-fileupload";

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
      const roomImages = req.files?.images as unknown as UploadedFile[];
      const response = await RoomLogic.createRoom({ input, roomImages });
      res.json({
        success: true,
        message: "Room created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteRoom(req, res, next) {
    try {
      const roomId = req.params.id;
      const response = await RoomLogic.deleteRoom({ roomId });
      res.json({
        success: true,
        message: "Room deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateRoom() {},
  async getRoomById() {},
  async bulkUploadRooms() {},
  async getAllRooms() {},
};
