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
  async updateRoom(req, res, next) {
    try {
      const roomId = req.params.id;
      const input = req.body;
      const response = await RoomLogic.updateRoom({
        roomId,
        input,
      });
      res.json({
        success: true,
        message: "Update Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getRoomById(req, res, next) {
    try {
      const id = req.params.id;
      const response = await RoomLogic.getRoomById(id);
      res.json({
        success: true,
        message: "Fetched room successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async bulkUploadRooms(req, res, next) {
    try {
    } catch (error) {}
  },
  async getAllRooms(req, res, next) {
    try {
      const response = await RoomLogic.getAllRooms();
      res.json({
        success: true,
        message: "Fetched all rooms successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};
