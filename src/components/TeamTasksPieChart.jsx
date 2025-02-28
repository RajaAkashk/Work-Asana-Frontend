import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const TeamTasksPieChart = () => {
  const { tasks } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const completedTasks = Array.isArray(tasks)
    ? tasks?.filter((task) => task.status === "Completed")
    : [];
  // console.log("completedTasks:- ", completedTasks);

  const teamTaskCount = completedTasks.reduce((acc, task) => {
    const teamName = task.team.name;
    acc[teamName] = (acc[teamName] || 0) + 1;
    return acc;
  }, {});

  // console.log("teamTaskCount:- ", teamTaskCount);

  const data = {
    labels: Object.keys(teamTaskCount),
    datasets: [
      {
        data: Object.values(teamTaskCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default TeamTasksPieChart;
