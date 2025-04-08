import {configureStore} from "@reduxjs/toolkit";
import adminReducer from "@/config/redux/reducer/adminReducer";
import userReducer from "@/config/redux/reducer/userReducer";


export const store = configureStore({
    reducer: {
        adminReducer: adminReducer,
        userReducer: userReducer,
    }
})