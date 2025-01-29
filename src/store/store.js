import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "../features/projects/projectSlice";
import { teamSlice } from "../features/teams/teamSlice";
import { taskSlice } from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    projects: projectSlice.reducer,
    teams: teamSlice.reducer,
    tasks: taskSlice.reducer,
  },
});
