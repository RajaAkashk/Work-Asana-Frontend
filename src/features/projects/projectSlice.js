import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "fetch/fetchProjects",
  async ({ projectStatus }) => {
    try {
      const queryParams = new URLSearchParams();

      if (projectStatus) queryParams.append("status", projectStatus);

      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/projects?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch projects";
    }
  }
);

export const createNewProject = createAsyncThunk(
  "post/createProject",
  async (newProject) => {
    try {
      const response = await axios.post(
        "https://work-asana-backend.vercel.app/api/projects",
        newProject
      );
      if (!response) {
        return "Problem in making new project";
      }
      return response.data.savedProject;
    } catch (error) {
      console.log("Error occured", error);
    }
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
    //**********add New Project
    builder.addCase(createNewProject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewProject.fulfilled, (state, action) => {
      state.status = "success";
      state.projects.push(action.payload);
    });
    builder.addCase(createNewProject.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default projectSlice.reducer;
