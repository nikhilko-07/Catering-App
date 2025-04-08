import {createSlice} from "@reduxjs/toolkit";

import {
    registerAdmin,
    loginAdmin,
    getOwnProfile, getallproducts, adminCart, getadminOrders, CreateAdminCart, DeleteCart, productInfo, createorder,
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
    productFetched: false,
    fetchedProducts: [],
    cartFetched: false,
    fetchedCart: [],
    ordersFetched: false,
    fetchedOrders: [],
    productInfoFetched: false,
    infoOfProducts: [],
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
            .addCase(getallproducts.pending,(state)=>{
                state.isLoading = true;
                state.message = "Loading data"
                state.isError = false;
            })
            .addCase(getallproducts.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productFetched = true;
                state.fetchedProducts = action.payload;
            })
            .addCase(adminCart.rejected,(state, action)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(adminCart.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartFetched = true;
                state.fetchedCart = action.payload;
            })
            .addCase(getadminOrders.rejected,(state, action)=>{
                state.isLoading = false;
                state.message = action.payload;
                state.isError = true;
            })
            .addCase(getadminOrders.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.ordersFetched = true;
                state.fetchedOrders = action.payload;
            })
            .addCase(CreateAdminCart.pending,(state)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(CreateAdminCart.rejected,(state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(CreateAdminCart.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(DeleteCart.rejected,(state, action)=>{
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(DeleteCart.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(productInfo.pending,(state)=>{
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(productInfo.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productInfoFetched = true;
                state.infoOfProducts = action.payload;
            })
            .addCase(createorder.rejected,(state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createorder.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
            })

    }
})

export const {reset, setTokenisthere} = adminSlice.actions;

export default adminSlice.reducer;