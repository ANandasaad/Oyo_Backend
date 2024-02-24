import { RequestHandler } from "express";
import { paymentGatewayLogic } from "../business.logic/payment-gateway.business.logic";

import crypto from "crypto";
import { configs, prisma } from "../config";
export const paymentGatewayController: {
  checkout: RequestHandler;
  verifyCheckOut:RequestHandler
  getKey:RequestHandler
} = {
  async checkout(req, res, next) {
    try {
        const amount= req.body.amount;
     const response= await paymentGatewayLogic.checkout(amount)
     res.json({
        success:true,
        message:"payment successful",
        data:response
     })
     
    } catch (error) {
        next(error)
    }
  },
  async verifyCheckOut(req,res,next){
    try {
          const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
          const hexSign = razorpay_order_id + "|" + razorpay_payment_id;
          const expectedSign = crypto
            .createHmac("sha256", configs.RAZOR_SECRET)
            .update(hexSign.toString())
            .digest("hex");
          const isAuthenticated = expectedSign === razorpay_signature;
          if (isAuthenticated) 
          await prisma.payment.create({
            data:{
                razorpayOrderId:razorpay_order_id,
                razorpayPaymentId:razorpay_payment_id,
                razorpaySignature:razorpay_signature
            }
        })
          res.redirect(`http://localhost:3000/payment-success?reference=${razorpay_payment_id}`)
    } catch (error) {
        next( error)
    }
  },
  async getKey(req,res,next){
    try {
        const response= await paymentGatewayLogic.getKey()
        res.json({
            success:true,
            message:"Get key successfully",
            data:response
        })
    } catch (error) {
        next(error)
    }
  }
};
