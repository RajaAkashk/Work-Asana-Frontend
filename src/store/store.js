import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "../features/projects/projectSlice";
// import { taskSlice } from "../features/projects/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    projects: projectSlice.reducer,
    // tasks: taskSlice.reducer,
  },
});
