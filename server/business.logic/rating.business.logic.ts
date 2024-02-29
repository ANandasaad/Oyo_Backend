import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { NotFound, Conflict } from "http-errors";
import { UploadedFile } from "express-fileupload";
import { mediaStore } from "../services/mediaUpload.service";

type CREATE_RATING = {
  input: Prisma.RatingUncheckedCreateInput;
  images: UploadedFile[];
  userId: string;
};

export const RatingLogic = {
  async createRating({ input, images, userId }: CREATE_RATING) {
    return new Promise(async (resolve, reject) => {
      try {
        const { hotelId, rating, review } = input;
        const isRatingExist = await prisma.rating.findFirst({
          where: {
            AND: [{ userId }, { hotelId }],
          },
        });
        if (isRatingExist) throw new Conflict("User already given the rating");
        let rawImages: any = [];
        if (images?.length) {
          for (let i = 0; i < images?.length; i++) {
            const img: any = images[i];
            const image = img
              ? await mediaStore.mediaUploadImage({
                  file: img as unknown as UploadedFile,
                  dir: "images",
                })
              : undefined;

            rawImages.push({
              url: image?.url || "",
              path: image?.path || "",
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
        const createRating = await prisma.rating.create({
          data: {
            hotelId,
            userId,
            rating,
            review,
            images: rawImages,
          },
        });
        return resolve(createRating);
      } catch (error) {
        reject(error);
      }
    });
  },
  async deleteRating() {},
  async updateRating() {},
  async getRatingById() {},
  async getAllRating() {},
};
