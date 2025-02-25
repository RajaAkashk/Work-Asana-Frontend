import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "fetch/fetchProjects",
  async (projectStatus) => {
    try {
      const queryParams = new URLSearchParams();

      if (projectStatus) queryParams.append("status", projectStatus);

      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/projects?${queryParams.toString()}`
      );
      // console.log("response from project slice", response.data);
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

export const deleteProject = createAsyncThunk(
  "delete/deleteProject",
  async (projectId) => {
    try {
      const response = await axios.delete(
        `https://work-asana-backend.vercel.app/api/projects/${projectId}`
      );
      if (!response) {
        return "Failed to delete project";
      }
      console.log("response.data while deleting project", response.data);
      return response.data;
    } catch (error) {
      console.log("Error occured while deleting project", error);
      return "Error in deleting project";
    }
  }
);

export const updateProject = createAsyncThunk(
  "put/updateTeam",
  async ({ projectId, updatedProject }) => {
    try {
      const response = await axios.put(
        `https://work-asana-backend.vercel.app/api/projects/${projectId}`,
        updatedProject
      );
      if (!response) {
        return "Failed to update project";
      }
      return response.data;
    } catch (error) {
      console.log("Error occured while updating project", error);
      return "Error in updating project";
    }
  }
);

// Fetch project by ID
export const fetchProjectById = createAsyncThunk(
  "get/fetchProjectById",
  async (projectId) => {
    try {
      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/projects/${projectId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return "Error in getting project by ID ";
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
      // console.log("fetchProjects action.payload", action.payload);
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
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
      state.error = action.error.message;
    });
    //**********Deleted a Project
    builder.addCase(deleteProject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.status = "success";
      console.log("deleteProject", action.payload);
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload._id
      );
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //**********fetch project By Id
    builder.addCase(fetchProjectById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.status = "success";
      console.log("fetchProjectById action.payload", action.payload);
      state.projects = action.payload;
    });
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //********** */ Updatig a project
    builder.addCase(updateProject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.status = "success";

      // Check if state.projects is an array
      if (Array.isArray(state.projects)) {
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      }
      console.log("updateProject action.payload", action.payload);
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default projectSlice.reducer;
