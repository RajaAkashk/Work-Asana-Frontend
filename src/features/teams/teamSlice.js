import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
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
    try {
      const response = await axios.get(
        `https://work-asana-backend.vercel.app/api/teams/${teamId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewTeam = createAsyncThunk("post/addTeam", async (newTeam) => {
  try {
    const response = await axios.post(
      "https://work-asana-backend.vercel.app/api/teams",
      newTeam
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addNewTeamMember = createAsyncThunk(
  "put/addNewTeamMember",
  async ({ teamId, newTeamMember }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://work-asana-backend.vercel.app/api/teams/member/${teamId}`,
        { member: newTeamMember }
      );
      console.log("addNewTeamMember", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to add member");
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "delete/deleteTeam",
  async (teamId) => {
    try {
      const response = await axios.delete(
        `https://work-asana-backend.vercel.app/api/teams/${teamId}`
      );
      if (!response) {
        return "Failed to delete team";
      }

      return response.data;
    } catch (error) {
      console.log("Error occured while deleting team", error);
      return "Error in deleting team";
    }
  }
);

export const updateTeam = createAsyncThunk(
  "put/updateTeam",
  async ({ teamId, updatedTeam }) => {
    try {
      const response = await axios.put(
        `https://work-asana-backend.vercel.app/api/teams/${teamId}`,
        updatedTeam
      );
      if (!response) {
        return "Failed to update team";
      }
      console.log("updatedTeam", response.data);
      return response.data;
    } catch (error) {
      console.log("Error occured while updating team", error);
      return "Error in updating team";
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
    });
    builder.addCase(fetchTeamById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //**********add New Team
    builder.addCase(addNewTeam.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTeam.fulfilled, (state, action) => {
      state.status = "success";
      state.teams.push(action.payload);
    });
    builder.addCase(addNewTeam.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //**********add New Team Member
    builder.addCase(addNewTeamMember.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTeamMember.fulfilled, (state, action) => {
      state.status = "success";
      console.log(" action.payload addNewTeamMember", action.payload);
      state.teams = action.payload;
      console.log("TEAMS FROM addNewTeamMember", JSON.stringify(state.teams));
    });
    builder.addCase(addNewTeamMember.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //**********Deleted a team
    builder.addCase(deleteTeam.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.status = "success";

      state.teams = state.teams.filter(
        (team) => team._id !== action.payload._id
      );
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    // Updatig a team
    builder.addCase(updateTeam.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.status = "success";

      // Check if state.teams is an array
      if (Array.isArray(state.teams)) {
        const index = state.teams.findIndex(
          (team) => team._id === action.payload._id
        );
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      }
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default teamSlice.reducer;
