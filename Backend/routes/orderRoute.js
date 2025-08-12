import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeorder, updatestatus, userorders, verifyorder } from "../controllers/ordercontroller.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeorder);
orderRouter.post("/verify",verifyorder)
orderRouter.post("/userorders",authMiddleware,userorders)
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updatestatus);

export default  orderRouter;