import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { NotFound } from "http-errors";
type HOTEL_TYPE = {
  input: Prisma.HotelUncheckedCreateInput;
};
type Ids = {
  hotelId: string;
};

export const HotelBusinessLogic = {
  async createHotel({ input }: HOTEL_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { address, name, images, amenities, cityId } = input;
        const create = await prisma.hotel.create({
          data: {
            cityId,
            address,
            name,
            images: images ? images : [],
            amenities,
          },
        });
        return resolve(create);
      } catch (error) {
        reject(error);
      }
    });
  },
  async deleteHotel({ hotelId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isHotelExits = await prisma.hotel.findUnique({
          where: {
            id: hotelId,
          },
        });
        if (!isHotelExits) throw new NotFound("Hotel not found");
        const deleteHotelById = await prisma.hotel.delete({
          where: {
            id: hotelId,
          },
        });
        return resolve(deleteHotelById);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateHotel() {},
  async getHotelById({ hotelId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isHotelExits = await prisma.hotel.findUnique({
          where: {
            id: hotelId,
          },
        });
        if (!isHotelExits) throw new NotFound("Hotel not found");
        return resolve(isHotelExits);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAllHotels() {
    return new Promise(async (resolve, reject) => {
      try {
        const allHotels = await prisma.hotel.findMany();
        if (!allHotels.length) throw new NotFound("Hotel not found");
        return resolve(allHotels);
      } catch (error) {
        reject(error);
      }
    });
  },
  async bulkUploadHotel() {},
};
