import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { baseUrl } from "../utils/baseUrl";
import { setFoods } from "../redux/foodSlice";

const useGetAllFoodList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                const res = await axios.get(`${baseUrl}/food/all`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setFoods(res.data.foods))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllFoods();
    }, []);
};

export default useGetAllFoodList;