import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { UnprocessableEntity } from "http-errors";
export const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new UnprocessableEntity(errors.array()[0].msg);
    next();
  } catch (error) {
    next(error);
  }
};
