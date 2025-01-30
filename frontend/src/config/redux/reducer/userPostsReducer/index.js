import { createSlice } from "@reduxjs/toolkit";
import { getAdminPostById, getAllAdminsPosts } from "@/config/redux/action/userPostsAction";

const initialState = {
    posts: [],
    isLoading: false,
    message: "",
    isError: false,
    postId: "",
    postFetched: false,
    postsLoaded: false,
    getPost: null, // Initialize getPost to null
};

const userPostsSlice = createSlice({
    name: "userPosts",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = "";
        },
        clearPostData: (state) => {
            state.getPost = null; // Clear the post data
            state.postsLoaded = false; // Reset postsLoaded
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAdminsPosts.pending, (state, action) => {
                state.isLoading = true;
                state.message = "Fetching posts...";
            })
            .addCase(getAllAdminsPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllAdminsPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload.posts.reverse();
            })
            .addCase(getAdminPostById.pending, (state, action) => {
                state.isLoading = true;
                state.message = "Fetching admin posts...";
            })
            .addCase(getAdminPostById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = "Fetching admin posts...";
                state.isError = false;
                state.getPost = action.payload;
                state.postsLoaded = true;
            })
            .addCase(getAdminPostById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearPostData } = userPostsSlice.actions; // Export the new action
export default userPostsSlice.reducer;
