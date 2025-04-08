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
            if(response.data.usertoken){
                localStorage.setItem("usertoken", response.data.usertoken);
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


export const  createProduct = createAsyncThunk(
    "product/createproduct",
    async (adminData, thunkAPI)=>{
        const {file, name, price, discountedprice, description} = adminData;
        try {

            const formData = new FormData();
            formData.append('usertoken', localStorage.getItem('usertoken'));
            formData.append('name', name);
            formData.append('media', file);
            formData.append('price', price);
            formData.append('discountedprice', discountedprice);
            formData.append('description', description);

            const response = await clientServer.post("/createProduct", formData,{
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


export const getuserProduct = createAsyncThunk(
    "product/getproduct",
    async (user, thunkAPI)=>{
        const response = await clientServer.get("/GetUserProduct",{
            headers:{
                usertoken: user.usertoken
            }
        })
        return response.data;
    }
)
export const Getuserorder = createAsyncThunk(
    "order/getuserOrder",
    async (user, thunkAPI)=>{
        try {
            const response = await clientServer.get("/getUserOrders",{
                headers:{
                    usertoken: user.usertoken
                }
            })
            return response.data;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const changetheStatus = createAsyncThunk(
    "order/changestatus",
    async (adminData, thunkAPI) => {
        try {
            const response = await clientServer.post("/changeStatus", {
                usertoken: adminData.usertoken,
                orderid: adminData.orderid
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);