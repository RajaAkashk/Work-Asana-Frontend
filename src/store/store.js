import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "../features/projects/projectSlice";
import { teamSlice } from "../features/teams/teamSlice";
import { taskSlice } from "../features/tasks/taskSlice";
import { tagSlice } from "../features/tags/tagSlice";
import { userSlice } from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    projects: projectSlice.reducer,
    teams: teamSlice.reducer,
    tasks: taskSlice.reducer,
    tags: tagSlice.reducer,
    users: userSlice.reducer,
  },
});
