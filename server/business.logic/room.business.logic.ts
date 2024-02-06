import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { UploadedFile } from "express-fileupload";
import { NotFound } from "http-errors";

type ROOM_TYPE = {
  input: Prisma.RoomUncheckedCreateInput;
  roomImages: UploadedFile;
};

export const RoomLogic = {
  async createRoom({ input, roomImages }: ROOM_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { hotelId, price, roomSize, roomType, facility } = input;
        const isHotelExist = await prisma.hotel.findUnique({
          where: {
            id: hotelId,
          },
        });
        if (!isHotelExist) throw new NotFound("Hotel not found");
      } catch (error) {}
    });
  },
  async deleteRoom() {},
  async updateRoom() {},
  async getRoomById() {},
  async getAllRooms() {},
  async bulkUploadRooms() {},
};
