import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, GetPost } from "@/config/redux/action/postAction";

const initialState = {
    posts: [],
    isLoading: false,
    message: "",
    isError: false,
    postId: "",
    postFetched: false,
    post: null, // Initialize post to null
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = "";
        },
        clearPostData: (state) => {
            state.post = null; // Clear the post data
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching posts...";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload.posts.reverse();
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(GetPost.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(GetPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.post = action.payload; // Store the post data here
            })
            .addCase(GetPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearPostData } = postSlice.actions; // Export the new action
export default postSlice.reducer;
