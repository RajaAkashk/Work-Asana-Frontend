import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk(
    "fetch/fetchTags",
    async () => {
      try {

        const response = await axios.get(
          `https://work-asana-backend.vercel.app/api/tags`
        );
        return response.data;
      } catch (error) {
        throw error.response?.data?.message || "Failed to fetch projects";
      }
    }
  );
  