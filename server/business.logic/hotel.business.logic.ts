import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { NotFound } from "http-errors";
import { UploadedFile } from "express-fileupload";
import { mediaStore } from "../services/mediaUpload.service";
type HOTEL_TYPE = {
  input: Prisma.HotelUncheckedCreateInput;
  images: UploadedFile[];
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
  async createHotel({ input, images }: HOTEL_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { address, name, amenities, cityId, popularLocalityId } = input;
        let rawImages: any = [];

        if (images?.length) {
          for (let i = 0; i < images.length; i++) {
            const img: any = images[i];

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
          rawImages = images
            ? await mediaStore.mediaUploadImage({
                file: images as unknown as UploadedFile,
                dir: "image",
              })
            : undefined;
        }

        const create = await prisma.hotel.create({
          data: {
            cityId: cityId ? cityId : undefined,
            address,
            name,
            images: rawImages,
            amenities,
            popularLocalityId: popularLocalityId
              ? popularLocalityId
              : undefined,
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
        for (let image of isHotelExits.images) {
          await mediaStore.deleteUploadImage(image.path as string);
        }

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
