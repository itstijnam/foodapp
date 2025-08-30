import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatusByOwner,
    updateOrderStatusByCustomer,
    getOrdersByUser,
} from "../controllers/order.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Customer
router.post("/create", isAuthenticated, createOrder);
router.put("/status/customer/:id", isAuthenticated, updateOrderStatusByCustomer);
router.get("/user/:userId", getOrdersByUser);

// Owner
router.get("/all", getAllOrders);
router.put("/status/owner/:id", isAuthenticated, updateOrderStatusByOwner);
router.get("/:id", getOrderById);

export default router;
