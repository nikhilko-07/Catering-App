import {createSlice} from "@reduxjs/toolkit";

import {
    registerAdmin,
    loginAdmin,
    getOwnProfile,
    getProfilByID,
    getProfilebyUsername
} from "@/config/redux/action/adminAction";

const initialState = {
    admin: undefined,
    isError: false,
    isServer: false,
    isLoading: false,
    isLoggedIn: false,
    isTokenThere: false,
    message: "",
    profileFetched: false,
    profileGet:false,
    profileFetcher:false
}

const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        reset:()=>initialState,
        setTokenisthere:(state)=>{
            state.isTokenThere= true
        },
        setIsTokenNotThere:(state)=>{
            state.isTokenThere= false
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(loginAdmin.pending,(state)=>{
                state.isLoading = true;
                state.message="Loading users..."
            })
            .addCase(loginAdmin.fulfilled,(state)=>{
                state.isLoading = false;
                state.isError = false;
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.message = "Login successfully"
            })
            .addCase(loginAdmin.rejected,(state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(registerAdmin.pending,(state)=>{
                state.isLoading = true;
                state.message = "Registering user..."
            })
            .addCase(registerAdmin.rejected,(state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = {message:"failed to register"};
            })
            .addCase(registerAdmin.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.message = {
                    message: "registration is successfull. Please login",
                }
            })
            .addCase(getOwnProfile.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.profileFetched = true;
                state.admin = action.payload.profile;
            })
            .addCase(getProfilByID.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.profileGet = true
                state.isSuccess = true;
                state.postInfo = action.payload;
            })
            .addCase(getProfilebyUsername.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.profileFetcher = true;
                state.Profile = action.payload;
            })

    }
})

export const {reset, setTokenisthere, setIsTokenNotThere} = adminSlice.actions;

export default adminSlice.reducer;