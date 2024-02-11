import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { configs } from "../config";
import { UploadedFile } from "express-fileupload";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import sharp from "sharp";

type Image_type = {
  file: UploadedFile;
  dir?: string;
};
type Image_type_return = {
  url: string;
  path: string;
};

const s3 = new S3Client({
  credentials: {
    accessKeyId: configs.ACCESS_KEY,
    secretAccessKey: configs.SECRET_ACCESS_KEY,
  },
  region: configs.BUCKET_REGION,
});

const cloudfront = new CloudFrontClient({
  credentials: {
    accessKeyId: configs.ACCESS_KEY,
    secretAccessKey: configs.SECRET_ACCESS_KEY,
  },
  region: configs.BUCKET_REGION,
});

const invalidateFileCache = async (fileName: string) => {
  try {
    const path = [`/${fileName}`];
    const command = new CreateInvalidationCommand({
      DistributionId: configs.DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString(),
        Paths: { Quantity: path.length, Items: path },
      },
    });
    await cloudfront.send(command);
  } catch (error) {
    return false;
  }
};

export const mediaStore = {
  async mediaUploadImage({ file, dir }: Image_type) {
    return new Promise<Image_type_return>(async (resolve, reject) => {
      try {
        const fileSplit = file.name.split(".");
        const fileType = fileSplit[fileSplit.length - 1];
        const fileName = `${new Date().getTime()}.${fileType}`;
        const params = {
          Bucket: configs.BUCKET_NAME,
          Key: `${dir}/${fileName}`,
          Body: file.data,
          ContentType: file.mimetype,
        };

        const command = new PutObjectCommand({ ...params });

        await s3.send(command);

        await invalidateFileCache(`${params.Key}`);
        return resolve({
          url: `${configs.CLOUD_FRONT_URL}/${params.Key}`,
          path: `${params.Key}`,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  async deleteUploadImage(path: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: configs.BUCKET_NAME,
          Key: path,
        };
        const command = new DeleteObjectCommand({ ...params });
        s3.send(command);
        await invalidateFileCache(path);
        return resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  },
};
