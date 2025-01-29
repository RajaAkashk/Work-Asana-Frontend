import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeams = createAsyncThunk("fetch/fetchTeams", async () => {
  try {
    const response = await axios.get(
      "https://work-asana-backend.vercel.app/api/teams"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// Fetch team by ID
export const fetchTeamById = createAsyncThunk(
  "teams/fetchTeamById",
  async (teamId) => {
    const response = await axios.get(
      `https://work-asana-backend.vercel.app/api/teams/${teamId}`
    );
    console.log("From tema by ID: ", response.data);
    return response.data;
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
      console.log(action.payload);
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    //**********fetch Team By Id
    builder.addCase(fetchTeamById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeamById.fulfilled, (state, action) => {
      state.status = "success";
      state.teams = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchTeamById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default teamSlice.reducer;
