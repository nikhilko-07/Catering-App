import {createSlice} from "@reduxjs/toolkit";
import {getprofilebyid, getUserInfo, loginUser, registerUser} from "@/config/redux/action/userAction";


const initialState = {
    user: undefined,
    isLoading: false,
    isError: false,
    userLoggedIn: false,
    isUserTokenThere: false,
    message:"",
    userProfileInfo:false,
    InfoGet:false
}

const userSlice = createSlice({
    name: "user",
    initialState:initialState,
    reducers: {
        reset:()=>initialState,
        setuserTokenisThere:(state)=>{
            state.isUserTokenThere = true
        },
        setuserTokenisNotThere:(state)=>{
            state.isUserTokenThere = false
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
                state.message = "Loading...";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = {message:"Registration is fulfilled. Please login"};
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = {message:"failed to register"};
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userLoggedIn = true;
                state.message = {message:"Login is fulfilled. Please login"};
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = {message:"failed to register"};
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.message = "Loading...";
            })
            .addCase(getUserInfo.pending, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "Loading";
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = {message:"failed to fetch users"};
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "Completed to fetch userInfo";
                state.userProfileInfo = true;
                state.userInfo = action.payload;
            })
            .addCase(getprofilebyid.rejected,(state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = {message: "failed to fetch data"}
            })
            .addCase(getprofilebyid.pending,(state, action)=>{
                state.isError = false;
                state.isLoading = true;
                state.message= {message: "fetching the data"}
            })
            .addCase(getprofilebyid.fulfilled,(state, action)=>{
                state.isError = false;
                state.isLoading = false;
                state.message = {message: "completed.."}
                state.fetchedData = action.payload;
                state.InfoGet = true
            })
    }
})
export const {reset, setuserTokenisThere,setuserTokenisNotThere} = userSlice.actions;

export default userSlice.reducer;