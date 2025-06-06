import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk("fetch/fetchTags", async () => {
  try {
    const response = await axios.get(
      `https://work-asana-backend.vercel.app/api/tags`
    );
    if (!response) {
      return "failed to get tags.";
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch projects";
  }
});

export const createNewTag = createAsyncThunk(
  "post/createNewTag",
  async (newTag) => {
    try {
      const response = await axios.post(
        "https://work-asana-backend.vercel.app/api/tags",
        newTag
      );
      if (!response) {
        return "Failed to add new tag.";
      }

      return response.data;
    } catch (error) {
      console.error("error occured whie creating new tag", error);
    }
  }
);

export const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.state = "success";
      state.tags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    // Add a new tag
    builder.addCase(createNewTag.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(createNewTag.fulfilled, (state, action) => {
      state.state = "success";
      state.tags.push(action.payload);
    });
    builder.addCase(createNewTag.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default tagSlice.reducer;
