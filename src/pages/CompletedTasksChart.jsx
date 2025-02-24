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
  //   const completedTasks = tasks?.filter(
  //     (task) =>
  //       task.status === "Completed" &&
  //       moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
  //   );

  //   const todoTasks = tasks?.filter(
  //     (task) =>
  //       task.status === "To Do" &&
  //       moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
  //   );
  //   const blockedTasks = tasks?.filter(
  //     (task) =>
  //       task.status === "Blocked" &&
  //       moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
  //   );

  //   const data = {
  //     labels: [
  //       ...new Set([
  //         ...completedTasks.map((task) => task.name),
  //         ...todoTasks.map((task) => task.name),
  //         ...blockedTasks.map((task) => task.name),
  //       ]),
  //     ], // Unique task names across all statuses
  //     datasets: [
  //       {
  //         label: "Completed Tasks",
  //         data: completedTasks.map(() => 1), // Each completed task counts as 1
  //         backgroundColor: "rgba(75, 192, 192, 0.6)",
  //         barThickness: 30,
  //       },
  //       {
  //         label: "To Do Tasks",
  //         data: todoTasks.map(() => 1), // Each to do task counts as 1
  //         backgroundColor: "rgba(255, 99, 132, 0.6)",
  //         barThickness: 30,
  //       },
  //       {
  //         label: "Blocked Tasks",
  //         data: blockedTasks.map(() => 1), // Each blocked task counts as 1
  //         backgroundColor: "rgba(153, 102, 255, 0.6)",
  //         barThickness: 30,
  //       },
  //     ],
  //   };

  return <Bar data={data} />;
};

export default CompletedTasksChart;
