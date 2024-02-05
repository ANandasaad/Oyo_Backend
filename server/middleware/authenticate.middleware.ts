import { Request, Response, NextFunction } from "express";
import { Unauthorized, NotFound } from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configs, prisma } from "../config";
import PRISMA from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: PRISMA.User;
    }
  }
}

const verifyToken = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Unauthorized("auth header is required");
  const token = authHeader.split(" ")[1];
  if (!token) throw new NotFound("token is required");
  const decode = jwt.verify(token, configs.JWT_SECRET) as JwtPayload;

  const user = await prisma.user.findUnique({
    where: {
      id: decode.id,
    },
  });
  if (!user) throw new NotFound("user is required");
  return user;
};

export const authentication = {
  admin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await verifyToken(req);
      if (user.role !== "Admin")
        throw new Unauthorized("user is not authorized");
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
  customer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await verifyToken(req);
      if (user.role !== "Customer")
        throw new Unauthorized("user is not authorized");
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
  businessOwner: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await verifyToken(req);
      if (user.role !== "BusinessOwner")
        throw new Unauthorized("user is not authorized");
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
  any: async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = await verifyToken(req);
      if (!user.role) throw Unauthorized("You can't perform this action!");
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};
