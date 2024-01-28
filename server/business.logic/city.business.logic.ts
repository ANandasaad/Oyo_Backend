import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { Conflict, NotFound } from "http-errors";
type City_types = {
  input: Prisma.CityCreateInput & Prisma.PopularLocalityUncheckedCreateInput;
};
type Ids = {
  cityId: string;
};
type Update_city = {
  cityId: string;
  input: Prisma.CityUpdateInput;
};

export const CityLogic = {
  async createCity({ input }: City_types) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, popularLocalityName } = input;

        const isCityAlreadyExists = await prisma.city.findFirst({
          where: {
            name,
          },
        });
        if (isCityAlreadyExists) throw new Conflict(`City already exists`);
        const create = await prisma.city.create({
          data: {
            name,
            PopularLocality: {
              createMany: {
                data: Array.isArray(popularLocalityName)
                  ? popularLocalityName.map((name) => ({
                      popularLocalityName: name,
                    }))
                  : [{ popularLocalityName: popularLocalityName }],
              },
            },
          },
          include: {
            PopularLocality: true,
          },
        });
        return resolve(create);
      } catch (error) {
        reject(error);
      }
    });
  },
  async deleteCity({ cityId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isCityAlreadyExists = await prisma.city.findUnique({
          where: {
            id: cityId,
          },
          include: { PopularLocality: true },
        });

        if (!isCityAlreadyExists) throw new NotFound("City not found");

        await Promise.all([
          isCityAlreadyExists.PopularLocality.map(async (popularity) => {
            await prisma.popularLocality.delete({
              where: {
                id: popularity.id,
              },
            });
          }),
        ]);
        const deleteCity = await prisma.city.delete({
          where: {
            id: cityId,
          },
          include: {
            PopularLocality: true,
          },
        });
        return resolve(deleteCity);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateCity({ cityId, input }: Update_city) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name } = input;
        const isCityAlreadyExists = await prisma.city.findUnique({
          where: {
            id: cityId,
          },
        });
        if (!isCityAlreadyExists) throw new NotFound("City is not found");
        const update = await prisma.city.update({
          where: {
            id: cityId,
          },
          data: {
            name,
          },
        });
        return resolve(update);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getCityByID({ cityId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isCityAlreadyExists = await prisma.city.findUnique({
          where: {
            id: cityId,
          },
          include: {
            Hotel: {
              select: {
                name: true,
                address: true,
                images: true,
                amenities: true,
              },
            },
          },
        });
        if (!isCityAlreadyExists) throw new NotFound("City not found");
        return resolve(isCityAlreadyExists);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const isCityAlreadyExists = await prisma.city.findMany({
          include: {
            PopularLocality: {
              select: {
                popularLocalityName: true,
              },
            },
          },
        });
        if (!isCityAlreadyExists.length) throw new NotFound("Cities not found");
        return resolve(isCityAlreadyExists);
      } catch (error) {
        reject(error);
      }
    });
  },
};
