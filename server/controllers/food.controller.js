import { Food } from "../models/food.model.js";
import { User } from "../models/user.model.js";


// ✅ Add New Food
export const addFood = async (req, res) => {
    try {
        const { sku, foodname, cuisine, description, originalPrice, discountedPrice, calories, image_link } = req.body;

        // console.log(req.body)
        // Validate fields
        if (!sku || !foodname || !originalPrice || !discountedPrice || !image_link) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }
        
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || !user.isAppOwner) {
            return res.status(403).json({ success: false, message: "Only app owners can add food items" });
        }

        // Check for duplicate SKU
        const existSKU = await Food.findOne({ sku });
        if (existSKU) {
            return res.status(400).json({ success: false, message: "SKU already exists" });
        }

        const food = await Food.create({
            sku,
            foodname,
            cuisine,
            originalPrice,
            discountedPrice,
            calories,
            description,
            image_link
        });

        return res.status(201).json({ success: true, message: "Food item added successfully", food });
    } catch (error) {
        console.error("Error in addFood:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Update Food
export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || !user.isAppOwner) {
            return res.status(403).json({ success: false, message: "Only app owners can update food items" });
        }

        const food = await Food.findByIdAndUpdate(id, updates, { new: true });
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        return res.status(200).json({ success: true, message: "Food updated successfully", food });
    } catch (error) {
        console.error("Error in updateFood:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Delete Food
export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndDelete(id);

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || !user.isAppOwner) {
            return res.status(403).json({ success: false, message: "Only app owners can delete food items" });
        }

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        return res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.error("Error in deleteFood:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Get All Foods
export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        return res.status(200).json({ success: true, foods });
    } catch (error) {
        console.error("Error in getAllFoods:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Get Food by ID
export const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        return res.status(200).json({ success: true, food });
    } catch (error) {
        console.error("Error in getFoodById:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Set Food Status to Live
export const setFoodLive = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndUpdate(id, { status: "live" }, { new: true });

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || !user.isAppOwner) {
            return res.status(403).json({ success: false, message: "Only app owners can live" });
        }

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        return res.status(200).json({ success: true, message: "Food status set to live", food });
    } catch (error) {
        console.error("Error in setFoodLive:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Set Food Status to Unlive
export const setFoodUnlive = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndUpdate(id, { status: "unlive" }, { new: true });

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || !user.isAppOwner) {
            return res.status(403).json({ success: false, message: "Only app owners can unlive" });
        }

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        return res.status(200).json({ success: true, message: "Food status set to unlive", food });
    } catch (error) {
        console.error("Error in setFoodUnlive:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
