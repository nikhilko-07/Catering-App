import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientServer} from "@/config";


export const getAllAdminsPosts = createAsyncThunk(
    "users/adminsPosts",
    async (user,thunkAPI)=>{
        try {
            const response = await clientServer.get("/getAllAdminsPost");
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue({message:"Server is runing"})
        }
    }
)

export const getAdminPostById = createAsyncThunk(
    "/users/getAdminPostById",
    async (_id,thunkAPI)=>{
        try {
            const response  = await clientServer.get("/getadminpostbyid",{
                params:{_id},
            })
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue({message:"Server is runing"})
        }
    }
)