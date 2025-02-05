import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("get/fetchUser", async () => {
  try {
    const response = await axios.get(
      "https://work-asana-backend.vercel.app/api/users"
    );
    if (!response) {
      return "failed to get users.";
    }
    return response.data;
  } catch (error) {
    console.log("error in fetching users.", error);
  }
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "loading";
      state.users = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
