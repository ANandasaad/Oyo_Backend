import express from 'express'
import { paymentGatewayController } from '../controllers/payment-gateway.controller'
const router= express.Router()
router.post("/check-out",paymentGatewayController.checkout)
router.post("/verify-checkout",paymentGatewayController.verifyCheckOut)
router.get("/get-key",paymentGatewayController.getKey)
export default router