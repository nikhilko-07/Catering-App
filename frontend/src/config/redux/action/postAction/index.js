import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientServer} from "@/config";


export const getAllPosts = createAsyncThunk(
    "/post/getAllPosts",
    async (admin, thunkAPI) =>{
        try {
            const response = await clientServer.get("/getAllPosts");
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return res.status(400).json({message:error.message})
        }
    }
)

export const  createPost = createAsyncThunk(
    "post/createPost",
    async (adminData, thunkAPI)=>{
        const {file, body, soilType} = adminData;
        try {

            const formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('body', body);
            formData.append('media', file);
            formData.append('soilType', soilType);

            const response = await clientServer.post("/createPost", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if(response.status === 200){
                return thunkAPI.fulfillWithValue("Post Uploaded");
            }else{
                return thunkAPI.rejectWithValue("Post Upload failed");
            }
        }catch(error){
            return thunkAPI.reject(error.response.data);
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (post_id, thunkAPI)=>{
        try {
            const response = await clientServer.delete("/deletePost",{
                data:{
                    token: localStorage.getItem('token'),
                    post_id: post_id.post_id,
                }
            });
        }catch(error){
            return thunkAPI.rejectWithValue("Post Upload failed");
        }
    }
)

export const GetPost = createAsyncThunk(
    "post/getPostById",
    async (_id, thunkAPI)=>{
        const response = await clientServer.get("/getPost",{
            params: { _id }
        })
        return response.data;
    }
)
