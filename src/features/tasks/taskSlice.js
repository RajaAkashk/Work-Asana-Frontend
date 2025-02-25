import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ taskStatus, prioritySort, dateSort } = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (taskStatus) queryParams.append("status", taskStatus);
      if (prioritySort) queryParams.append("prioritySort", prioritySort);
      if (dateSort) queryParams.append("dateSort", dateSort);

      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/tasks?${queryParams.toString()}`
      );
      console.log("Fetched tasks:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
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
      console.log("NEW Task", newTask);
      if (!response) {
        return "Failed to create new task";
      }
      return response.data.savedTask;
    } catch (error) {
      console.log("error in creating new task", error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "delete/deleteTask",
  async (taskId) => {
    try {
      const response = await axios.delete(
        `https://work-asana-backend.vercel.app/api/tasks/${taskId}`
      );
      if (!response) {
        return "Failed to delete task";
      }
      console.log("response data from delete task:", response.data);
      return response.data;
    } catch (error) {
      console.log("error in deleting task", error);
    }
  }
);

// Fetch task by ID
export const fetchTaskById = createAsyncThunk(
  "get/fetchTaskById",
  async (taskId) => {
    try {
      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/tasks/${taskId}`
      );
      console.log("fetchTaskById response.data", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return "Error in getting task by ID ";
    }
  }
);

// update Task
export const updateTask = createAsyncThunk(
  "put/updateTask",
  async ({ taskId, updatedTask }) => {
    try {
      const response = await axios.put(
        `https://work-asana-backend.vercel.app/api/tasks/${taskId}`,
        updatedTask
      );
      if (!response) {
        return "Failed to update the task";
      }
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error in update task", error);
      return "error while updating the task";
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
      console.log("fetch check action :", action.payload);
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = "error";
      console.log("fetchTasks .error.message :- ", action.error.message);
      state.error = action.error.message;
    });
    // create New Task
    builder.addCase(createNewTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewTask.fulfilled, (state, action) => {
      console.log("createNewTask action.payload:", action.payload);
      if (action.payload) {
        state.status = "success";
        console.log("action.payload of task view: ", action.payload);
        state.tasks.push(action.payload);
      } else {
        console.error("Received an invalid payload");
      }
    });
    builder.addCase(createNewTask.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    // delete a Task
    builder.addCase(deleteTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload.deletedTask._id
      );
      console.log("action.payload of deleteTask: ", action.payload.deletedTask);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //**********fetch task By Id
    builder.addCase(fetchTaskById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTaskById.fulfilled, (state, action) => {
      state.status = "success";
      console.log("fetchTaskById action.payload", action.payload);
      state.tasks = action.payload;
    });
    builder.addCase(fetchTaskById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //**********update task By Id
    builder.addCase(updateTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.status = "success";
      if (Array.isArray(state.tasks)) {
        const index = state.tasks.indexOf(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      }
      console.log("updateTask action.payload", action.payload);
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default taskSlice.reducer;
