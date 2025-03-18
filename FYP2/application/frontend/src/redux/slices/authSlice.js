import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// // API base URL
// const API_URL = "http://127.0.0.1:8000/api"; // Replace with your Django backend URL

// // Async thunk for login
// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post(`${API_URL}/token/`, credentials);
//       return response.data; // { access, refresh }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// Async thunk for refreshing token
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken, thunkAPI) => {
    try {
      //   console.log("Start of refreshAccessToken THUNK");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );
      //   console.log("End of refreshAccessToken THUNK", response.data);
      return response.data; // { access }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);

      //   localStorage.setItem("auth", JSON.stringify(action.payload)); // Store tokens in localStorage
    },
    // refreshToken: (state, action) => {
    //   state.accessToken = action.payload;
    //   //   localStorage.setItem("accessToken", action.payload); // Store access token in localStorage
    //   state.refreshToken = action.payload;
    //   //   localStorage.setItem("refreshToken", action.payload); // Store refresh token in localStorage
    // },
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      //   localStorage.removeItem("auth"); // Clear tokens from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      // .addCase(login.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.accessToken = action.payload.access;
      //   state.refreshToken = action.payload.refresh;
      //   localStorage.setItem(
      //     "auth",
      //     JSON.stringify({
      //       access: action.payload.access,
      //       refresh: action.payload.refresh,
      //     })
      //   );
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      // Handle refresh token
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;

        localStorage.setItem("accessToken", action.payload.access);
        // const auth = JSON.parse(localStorage.getItem("auth"));
        // auth.access = action.payload.access;
        // localStorage.setItem("auth", JSON.stringify(auth));
      });
  },
});

export const { logout, login, refreshToken } = authSlice.actions;
export default authSlice.reducer;
