import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAppOwner: false,
        userProfile: null,
        selectedUser:null
    },
    reducers: {
        setAuthUser: (state, action)=>{
            state.user = action.payload
        },
        setUserProfile: (state, action)=>{
            state.userProfile = action.payload
        },
        setSelectedUser: (state, action)=>{
            state.selectedUser = action.payload
        },
        setAppOwner: (state, action)=>{
            state.isAppOwner = action.payload
        }
    }
});

export const {setAuthUser, setUserProfile, setSelectedUser, setAppOwner} = authSlice.actions;
export default authSlice.reducer;