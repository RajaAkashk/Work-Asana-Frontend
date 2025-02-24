import React from "react";
import { Bar } from "react-chartjs-2";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompletedTasksChart = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  console.log("tasks:", tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Filter completed tasks in the last 7 days
  const lastWeekTasks = tasks.filter(
    (task) =>
      task.status === "Completed" &&
      moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
  );

  tasks.forEach((task) => {
    console.log("UpdatedAt:", task.updatedAt);
    console.log("Seven days ago:", moment().subtract(7, "days").toString());
  });

  console.log("Last week tasks:", lastWeekTasks);

  const data = {
    labels: lastWeekTasks.map((task) => task.name),
    datasets: [
      {
        label: "Completed Tasks",
        data: lastWeekTasks.map(() => 1), // Each completed task counts as 1
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default CompletedTasksChart;
