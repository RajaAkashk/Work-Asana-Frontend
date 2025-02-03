import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ taskStatus, prioritySort, dateSort }) => {
    try {
      const queryParams = new URLSearchParams();

      if (taskStatus) queryParams.append("status", taskStatus);
      if (prioritySort) queryParams.append("prioritySort", prioritySort);
      if (dateSort) queryParams.append("dateSort", dateSort);

      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/tasks?${queryParams.toString()}`
      );

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch tasks";
    }
  }
);

export const createNewTask = createAsyncThunk(
  "post/createTask",
  async (newTask) => {
    try {
      const response = await axios.post(
        "https://work-asana-backend.vercel.app/api/tasks",
        newTask
      );
      if (!response) {
        return "Failed to create new task";
      }
      return response.data.savedTask;
    } catch (error) {
      console.log("error in creating new task", error);
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    // create New Task
    builder.addCase(createNewTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewTask.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks.push(action.payload);
    });
    builder.addCase(createNewTask.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
