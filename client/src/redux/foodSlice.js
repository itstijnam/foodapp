import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name: 'food',
    initialState: {
        foods: [],
        selectedFood: null,
    },
    reducers: {
        setFoods: (state, action)=>{
            state.foods = action.payload
        },
        setSelectedFood: (state, action)=>{
            state.selectedFood = action.payload
        }
    }
});

export const {setFoods, setSelectedFood } = foodSlice.actions;
export default foodSlice.reducer;