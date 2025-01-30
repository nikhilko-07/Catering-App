import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientServer} from "@/config";


export const registerUser = createAsyncThunk(
    "/user/register",
    async (user, thunkAPI) => {
        try {
              const response = await clientServer.post("/registerUser",{
                  username: user.username,
                  password: user.password,
                  name: user.username,
                  email: user.email
              });
              return response.data;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const loginUser = createAsyncThunk(
    "/user/login",
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post("/loginUser",{
                email: user.email,
                password: user.password
            })
            if(response.data.Usertoken){
                localStorage.setItem("Usertoken", response.data.Usertoken);
            }else {
                return thunkAPI.rejectWithValue({
                    message: "Invalid Token",
                })
            }
            return thunkAPI.fulfillWithValue(response.data.Usertoken)
        }catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);


        }
    }
)

export const getUserInfo = createAsyncThunk(
    "/user/getUserInfo",
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.get("/getUserInfo",{
                params:{
                    Usertoken: user.Usertoken
                }
            });
            return thunkAPI.fulfillWithValue(response.data)
        }catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const getprofilebyid = createAsyncThunk(
    "/user/getProfile",
    async ({adminId}, thunkAPI) =>{
        try{

            const response = await clientServer.get("/getPostAdminId",{
                params:{adminId}
            })
            return response.data;

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);