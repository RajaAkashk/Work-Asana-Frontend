import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PendingTasksChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { tasks } = useSelector((state) => state.tasks);

  const pendingTasks = Array.isArray(tasks)
    ? tasks?.filter(
        (task) => task.status === "To Do" || task.status === "Blocked"
      )
    : [];

  const projectTaskCount = pendingTasks.reduce((acc, task) => {
    const projectName = task.project.name;
    acc[projectName] = (acc[projectName] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(projectTaskCount),
    datasets: [
      {
        label: "Pending Tasks",
        data: Object.values(projectTaskCount),
        barThickness: 30,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default PendingTasksChart;
