import { Prisma } from "@prisma/client";
import { prisma } from "../config";

type ROOM_TYPE = {
  input: Prisma.RoomUncheckedCreateInput;
};

export const RoomLogic = {
  async createRoom({ input }: ROOM_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error) {}
    });
  },
  async deleteRoom() {},
  async updateRoom() {},
  async getRoomById() {},
  async getAllRooms() {},
  async bulkUploadRooms() {},
};
