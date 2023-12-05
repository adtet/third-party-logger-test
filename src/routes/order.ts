import express from "express";
import * as OrderController from "../controllers/order"
import * as OrderValidator from "../validations/order"


const router = express.Router();

router.post("/",OrderValidator.createValidation(),OrderController.postLogging)

export default router;
