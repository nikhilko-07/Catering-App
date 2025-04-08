import {createSlice} from "@reduxjs/toolkit";
import {createProduct, Getuserorder, getuserProduct, loginUser, registerUser} from "@/config/redux/action/userAction";


const initialState = {
    user: undefined,
    isLoading: false,
    isError: false,
    userLoggedIn: false,
    isUserTokenThere: false,
    message:"",
    userProfileInfo:false,
    InfoGet:false,
    userProduct: {},
    orderGet:false,
    orderList:[],
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
            .addCase(createProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = true;
                state.message = {message:"Products Registered"};
            })
            .addCase(getuserProduct.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getuserProduct.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = true;
                state.message = {message:"Got the product"};
                state.InfoGet = true;
                state.userProduct = action.payload;
            })
            .addCase(Getuserorder.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(Getuserorder.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = true;
                state.orderGet = true;
                state.orderList = action.payload;
            })

    }
})
export const {reset, setuserTokenisThere,setuserTokenisNotThere} = userSlice.actions;

export default userSlice.reducer;