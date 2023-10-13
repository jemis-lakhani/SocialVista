import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  friends: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = null;
      state.friends = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.friends = action.payload.friends;
      } else {
        console.error("user friends not-exists");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPost;
    },
  },
});

export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts } =
  authSlice.actions;

export default authSlice.reducer;
