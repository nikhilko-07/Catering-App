import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientServer} from "@/config";

export const registerAdmin = createAsyncThunk(
    "/register",
    async (admin, thunkAPI) => {
        try {
            const response = await clientServer.post("/register", {
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
            const response = await clientServer.post("/login", {
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
                params: {
                    token: admin.token
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
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateProfileAdminInfo = createAsyncThunk(
    "/admin/updateProfileAdminInfo",
    async (admin, thunkAPI) => {
        const response = await clientServer.post("/updateProfileInfo", {
                token: admin.token,
                address: admin.address,
                bio: admin.bio,
                mobile: admin.mobile,
                name: admin.name
        })
    }
)

export const getProfilByID = createAsyncThunk(
    "/admin/getProfilByID",
    async ({ adminId }, thunkAPI) => {
        try {
            const response = await clientServer.get("/getProfileById", {
                params: { adminId }
            });
            return response.data; // Return the data you need
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // Handle errors appropriately
        }
    }
);

export const getProfilebyUsername  = createAsyncThunk(
    "/admin/getprofilebyUsername",
    async (username) => {
        const response = await clientServer.get("/getProfileOnUsername", {
            params: { username }
        });

        return response.data;

    }
)