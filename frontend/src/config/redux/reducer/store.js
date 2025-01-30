import {configureStore} from "@reduxjs/toolkit";
import adminReducer from "@/config/redux/reducer/adminReducer";
import postReducer from "@/config/redux/reducer/postReducer";
import userReducer from "@/config/redux/reducer/userReducer";
import userPostsReducer from "@/config/redux/reducer/userPostsReducer";


export const store = configureStore({
    reducer: {
        adminReducer: adminReducer,
        postReducer: postReducer,
        userReducer: userReducer,
        userPostReducer: userPostsReducer,
    }
})