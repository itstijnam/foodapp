import express from "express";
import {
    addFood,
    updateFood,
    deleteFood,
    getAllFoods,
    getFoodById,
    setFoodLive,
    setFoodUnlive
} from "../controllers/food.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addFood);
router.put("/update/:id", isAuthenticated, updateFood);
router.delete("/delete/:id", isAuthenticated, deleteFood);
router.get("/all", getAllFoods);
router.get("/:id", getFoodById);
router.put("/live/:id", isAuthenticated, setFoodLive);
router.put("/unlive/:id", isAuthenticated, setFoodUnlive);

export default router;
