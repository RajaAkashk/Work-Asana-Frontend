import React from "react";
import { Bar } from "react-chartjs-2";
import { fetchTasks } from "../features/tasks/taskSlice";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompletedTasksChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { tasks } = useSelector((state) => state.tasks || []);

  // Filter completed tasks in the last 7 days
  const lastWeekTasks = tasks.filter(
    (task) =>
      task.status === "Completed" &&
      moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
  );

  const data = {
    labels: lastWeekTasks.map((task) => task.name),
    datasets: [
      {
        label: "Completed Tasks",
        data: lastWeekTasks.map(() => 1), // Each completed task counts as 1
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        barThickness: 30,
      },
    ],
  };

  return <Bar data={data} />;
};

export default CompletedTasksChart;
