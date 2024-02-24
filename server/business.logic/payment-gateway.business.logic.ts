import { configs, prisma } from "../config";
import { instance } from "../services/paymentGateway.service";
import crypto from "crypto";
type RAZOR_TYPE = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  
};
export const paymentGatewayLogic = {
  async checkout(amount: number) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          amount: Number(amount * 100),
          currency: "INR",
        };
        const order = instance.orders.create(options);
        return resolve(order);
      } catch (error) {
        reject(error);
      }
    });
  },
  async verifyCheckOut({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    
  }: RAZOR_TYPE) {
    return new Promise(async(resolve, reject) => {
      try {
        const hexSign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
          .createHmac("sha256", configs.RAZOR_SECRET)
          .update(hexSign.toString())
          .digest("hex");
        const isAuthenticated = expectedSign === razorpay_signature;
        if (isAuthenticated) {
            await prisma.payment.create({
                data:{
                    razorpayOrderId:razorpay_order_id,
                    razorpayPaymentId:razorpay_payment_id,
                    razorpaySignature:razorpay_signature
                }
            })
          return resolve({ success: true });
        } else {
          reject({ success: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  async getKey() {
    return new Promise((resolve, reject) => {
      try {
        return resolve({ key: configs.RAZOR_KEY });
      } catch (error) {
        reject(error);
      }
    });
  },
};
