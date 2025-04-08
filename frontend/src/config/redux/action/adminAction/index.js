import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientServer} from "@/config";

export const registerAdmin = createAsyncThunk(
    "/register",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.post("/registerAdmin", {
                email: admin.email,
                password: admin.password,
                name: admin.name,
                username: admin.username,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const loginAdmin = createAsyncThunk(
    "/login",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.post("/loginAdmin", {
                email: admin.email,
                password: admin.password
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            } else {
                return thunkAPI.rejectWithValue({
                    message: "token not found"
                });
            }
            return thunkAPI.fulfillWithValue(response.data.token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getOwnProfile = createAsyncThunk(
    "/admin/getMyProfile",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.get("/get_My_Profile", {
                headers: {
                    Authorization: `Bearer ${admin.token}`
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateProfilePicture = createAsyncThunk(
    "/updateProfilePicture",
    async (file, thunkAPI) => {
        const formData = new FormData();
        formData.append("profile_picture", file); // Ensure this matches the server-side expectation
        formData.append("token", localStorage.getItem("token"));

        try {
            const response = await clientServer.post("/uploadProfilePicture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateProfileAdminInfo = createAsyncThunk(
    "/admin/updateProfileAdminInfo",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.post("/updateProfileInfo", {
                token: admin.token,
                address: admin.address,
                bio: admin.bio,
                mobile: admin.mobile,
                name: admin.name
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getallproducts = createAsyncThunk(
    "/getallproducts",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.get("/getAllProducts", {
                headers:{
                    token: admin.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const adminCart = createAsyncThunk(
    "/adminCart",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.get("/getCart", {
                headers: {
                    token: admin.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const CreateAdminCart = createAsyncThunk(
    "/createAdminCart",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.post("/createCart",{}, {
                headers:{
                    token: admin.token,
                    productid: admin.productid
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const DeleteCart = createAsyncThunk(
    "/deletecart",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.delete("/deleteCart", {
                headers: {
                    token: admin.token,
                    cartid: admin.cartid
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getadminOrders = createAsyncThunk(
    "/getadminOrders",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.get("/getAdminOrder", {
                headers: {
                    token: admin.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const productInfo = createAsyncThunk(
    "/productInfo",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.get("/getProductInfo",{
                headers: {
                    Authorization: admin.token,
                    productid: admin.productid
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const createorder = createAsyncThunk(
    "/CreateOrder",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.post("/createOrder", {},{
                headers: {
                    Authorization: admin.token,
                    productid: admin.productid,
                    name: admin.name,
                    phone: admin.phone,
                    pincode: admin.pinCode,
                    address: admin.address,
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch (err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)














