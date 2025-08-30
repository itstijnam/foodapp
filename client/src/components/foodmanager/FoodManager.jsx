import axios from "axios";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FoodManager = () => {
    // const [foods, setFoods] = useState([]);
    const [editingFood, setEditingFood] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { foods } = useSelector(store => store.food);
    const navigate =  useNavigate();
    // Fetch foods from backend
    const API_URL = "http://localhost:3000/food";

    const fetchFoods = async () => {
        const res = await axios.get(`${API_URL}/all`);
        setFoods(res.data.foods);
    };

    const addFood = async (food) => {
        console.log(food)
        await axios.post(`${API_URL}/add`, food, { withCredentials: true });
        fetchFoods();
        setShowForm(false);
    };

    const updateFood = async (food) => {
        await axios.put(`${API_URL}/update/${food._id}`, food, { withCredentials: true });
        fetchFoods();
        setEditingFood(null);
        setShowForm(false);
    };

    const deleteFood = async (id) => {
        await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });
        fetchFoods();
    };

    const toggleLive = async (id) => {
        const food = foods.find(f => f._id === id);
        const endpoint = food.status === 'live' ? 'unlive' : 'live';
        await axios.put(`${API_URL}/${endpoint}/${id}`, {}, { withCredentials: true });
        fetchFoods();
    };

    const cancelEdit = async () => {
        setShowForm(false)
    }
    return (
        <div className="food-manager">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
            </button>
            <div className="header">
                <h1>Menu Management</h1>
                <button
                    className="add-btn"
                    onClick={() => setShowForm(true)}
                >
                    <Plus size={20} color="white" />
                    Add Food
                </button>
            </div>

            {(showForm || editingFood) && (
                <FoodForm
                    onSubmit={editingFood ? updateFood : addFood}
                    editingFood={editingFood}
                    onCancel={cancelEdit}
                />
            )}

            <FoodList
                foods={foods}
                onEdit={setEditingFood}
                onDelete={deleteFood}
                onToggleLive={toggleLive}
            />
        </div>
    );
};

export default FoodManager;