import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { UploadedFile } from "express-fileupload";
import { NotFound } from "http-errors";
import { mediaStore } from "../services/mediaUpload.service";

type ROOM_TYPE = {
  input: Prisma.RoomUncheckedCreateInput;
  roomImages: UploadedFile[];
};

type Ids = {
  roomId: string;
};

type ROOM_UPDATE = {
  roomId: string;
  input: Prisma.RoomUncheckedUpdateInput;
};

export const RoomLogic = {
  async createRoom({ input, roomImages }: ROOM_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { hotelId, price, roomSize, roomType, facility } = input;
        console.log(roomImages);
        let rawImages: any = [];

        if (roomImages?.length) {
          for (let i = 0; i < roomImages.length; i++) {
            const img: any = roomImages[i];

            const image = img
              ? await mediaStore.mediaUploadImage({
                  file: img as unknown as UploadedFile,
                  dir: "images",
                })
              : undefined;

            rawImages.push({
              url: image?.url || " ",
              path: image?.path || " ",
            });
          }
        } else {
          rawImages = roomImages
            ? await mediaStore.mediaUploadImage({
                file: roomImages as unknown as UploadedFile,
                dir: "image",
              })
            : undefined;
        }
        const isHotelExist = await prisma.hotel.findUnique({
          where: {
            id: hotelId,
          },
        });
        if (!isHotelExist) throw new NotFound("Hotel not found");

        const create = await prisma.room.create({
          data: {
            price: Number(price),
            roomSize,
            roomType,
            hotelId,
            roomImages: rawImages,
            facility: facility ? facility : undefined,
          },
        });
        return resolve(create);
      } catch (error) {
        reject(error);
      }
    });
  },
  async deleteRoom({ roomId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isRoomExist = await prisma.room.findUnique({
          where: {
            id: roomId,
          },
        });
        if (!isRoomExist) throw new NotFound("Room not found");
        for (let image of isRoomExist.roomImages) {
          await mediaStore.deleteUploadImage(image.path as string);
        }
        const deleteRoom = await prisma.room.delete({
          where: {
            id: roomId,
          },
        });
        return resolve(deleteRoom);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateRoom({ roomId, input }: ROOM_UPDATE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { facility, price, roomSize, roomType } = input;
        const isRoomExist = await prisma.room.findUnique({
          where: {
            id: roomId,
          },
        });
        if (!isRoomExist) throw new NotFound("Room not found");
        const updateRoom = await prisma.room.update({
          where: {
            id: roomId,
          },
          data: {
            price,
            facility,
            roomSize,
            roomType,
          },
        });
        return resolve(updateRoom);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getRoomById(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const isRoomExist = await prisma.room.findUnique({
          where: {
            id,
          },
        });
        if (!isRoomExist) throw new NotFound("Room not found");
        return resolve(isRoomExist);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAllRooms() {
    return new Promise(async (resolve, reject) => {
      try {
        const allRooms = await prisma.room.findMany();
        if (!allRooms.length) throw new NotFound("Room not found");
        return resolve(allRooms);
      } catch (error) {
        reject(error);
      }
    });
  },
  async bulkUploadRooms() {},
};
