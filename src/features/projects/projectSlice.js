import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "fetch/fetchProjects",
  async () => {
    const response = await axios.get(
      "https://work-asana-backend.vercel.app/api/projects"
    );
    return response.data;
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default projectSlice.reducer;
