import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { NotFound } from "http-errors";
type HOTEL_TYPE = {
  input: Prisma.HotelUncheckedCreateInput & Prisma.RoomUncheckedCreateInput;
};
type Ids = {
  hotelId?: string;
  cityId?: string;
  popularlocalityId?: string;
};

type HOTEL_SEARCH_TYPE = {
  cityName: string;
};

export const HotelBusinessLogic = {
  async createHotel({ input }: HOTEL_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          address,
          name,
          images,
          amenities,
          cityId,
          popularLocalityId,
          price,
          roomSize,
          roomType,
          facility,
          roomImages,
        } = input;
        const create = await prisma.hotel.create({
          data: {
            cityId: cityId ? cityId : undefined,
            address,
            name,
            images: images ? images : [],
            amenities,
            popularLocalityId: popularLocalityId
              ? popularLocalityId
              : undefined,

            Room: {
              createMany: {
                data: [],
              },
            },
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
  async hotelByCityId({ cityId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(cityId);
        const isCityExits = await prisma.city.findUnique({
          where: {
            id: cityId,
          },
          include: {
            Hotel: {
              select: {
                name: true,
                address: true,
                amenities: true,
              },
            },
          },
        });
        if (!isCityExits) throw new NotFound("City not found");
        return resolve(isCityExits);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getHotelByPopularlocalityId({ popularlocalityId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isPopularLocalityExits = await prisma.popularLocality.findUnique({
          where: {
            id: popularlocalityId,
          },
          include: {
            city: true,
            Hotel: {
              select: {
                name: true,
                address: true,
                amenities: true,
                images: true,
              },
            },
          },
        });

        if (!isPopularLocalityExits)
          throw new NotFound("Address of locality not found");
        return resolve(isPopularLocalityExits);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAllHotels(cityName: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const allHotels = await prisma.hotel.findMany({
          where: {
            OR: [
              {
                city: {
                  name: {
                    startsWith: cityName,
                    mode: "insensitive",
                  },
                },
              },
              {
                popularLocality: {
                  popularLocalityName: {
                    startsWith: cityName,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          include: {
            city: true,
            popularLocality: true,
          },
        });
        if (!allHotels.length) throw new NotFound("Hotel not found");
        return resolve(allHotels);
      } catch (error) {
        reject(error);
      }
    });
  },

  async bulkUploadHotel() {},
};
