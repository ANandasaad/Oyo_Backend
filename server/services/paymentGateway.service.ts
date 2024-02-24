import Razorpay from "razorpay";
import { configs } from "../config";

export const instance = new Razorpay({
  key_id: configs.RAZOR_KEY,
  key_secret: configs.RAZOR_SECRET,
});
