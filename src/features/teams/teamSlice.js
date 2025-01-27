import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchTeams = createAsyncThunk("fetch/fetchTeams", async () => {
//   const response = await axios.get(
//     "https://work-asana-backend.vercel.app/api/teams"
//   );
//   return response.data;
// });

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://work-asana-backend.vercel.app/api/teams"
      );
      return response.data; // Return the data on success
    } catch (error) {
      // Handle error and return the error message via rejectWithValue
      return rejectWithValue(error.response?.data || "Failed to fetch teams");
    }
  }
);

export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.status = "success";
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default teamSlice.reducer;
