import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { configs, prisma } from "../config";
import { NotFound, Conflict } from "http-errors";
import jwt from "jsonwebtoken";
type SIGN_UP = {
  input: Prisma.UserCreateInput;
};

type SIGN_IN = {
  email: string;
  password: string;
};
type Ids = {
  userId: string;
};

export const UserLogic = {
  async signUp({ input }: SIGN_UP) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, email, password, phoneNumber } = input;
        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashPassword,
            phoneNumber,
          },
        });
        return resolve(createUser);
      } catch (error) {
        reject(error);
      }
    });
  },
  async signIn({ email, password }: SIGN_IN) {
    return new Promise(async (resolve, reject) => {
      try {
        const isUserExist = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!isUserExist) throw new NotFound("User does not exist");
        const decryptPassword = await bcrypt.compare(
          password,
          isUserExist.password
        );
        if (!decryptPassword) throw new NotFound("Password does not match");
        const token = await jwt.sign(
          { id: isUserExist.id, role: isUserExist.role },
          configs.JWT_SECRET
        );
        const userSignIn = await prisma.user.update({
          where: {
            id: isUserExist.id,
          },
          data: {
            isLoggedIn: true,
          },
        });
        return resolve({ user: userSignIn, token });
      } catch (error) {
        reject(error);
      }
    });
  },
  async self({ userId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            name: true,
            email: true,
            phoneNumber: true,
            isLoggedIn: true,
          },
        });
        if (!user) throw new NotFound("User does not exist");
        return resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
};
